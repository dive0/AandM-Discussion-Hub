import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../firebase_setup/firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  arrayUnion,
  increment,
  addDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import {
  BsFillHandThumbsUpFill,
  BsFillTrashFill,
  BsPencilFill,
} from "react-icons/bs";
import Comment from "../Components/Comment";

const PostDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [error, setError] = useState("");
  const [currentPost, setCurrentPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const commentRef = useRef();

  let docRef;
  let currentHub;
  if (location.state.previousPage === "AnimeHub") {
    docRef = doc(firestore, "AnimePosts", id);
    currentHub = "AnimeHub";
  } else if (location.state.previousPage === "MangaHub") {
    docRef = doc(firestore, "MangaPosts", id);
    currentHub = "MangaHub";
  }

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setCurrentPost({
        ...doc.data(),
        id: doc.id,
      });
    });
  }, []);

  const userDocRef = doc(firestore, "userInfo", currentUser.uid);

  useEffect(
    () => onSnapshot(userDocRef, (snapshot) => setUserName(snapshot.data())),
    []
  );

  const handleUpVote = () => {
    updateDoc(docRef, {
      upVote: increment(1),
    });
  };

  const handleDelete = () => {
    deleteDoc(docRef).then(() => {
      switch (currentHub) {
        case "AnimeHub":
          navigate("/");
          break;
        case "MangaHub":
          navigate("/manga-hub");
          break;
        default:
          break;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      addDoc(collection(firestore, "Comment"), {
        replierId: currentUser.uid,
        replierName: userName.userName,
        dateCreatedOn: new Date().toLocaleString(),
        commentText: commentRef.current.value,
      }).then((result) =>
        getDoc(result).then((doc) =>
          updateDoc(docRef, { comment: arrayUnion({ commentId: doc.id }) })
        )
      );
      e.target.reset();
    } catch {
      setError("Failed to create comment");
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-start-2">
        {error && alert(error)}
        <div className="bg-slate-600 py-4 px-3 my-2 rounded-lg text-white space-y-2">
          <p>
            Posted by {currentPost.postOwnerName} on {currentPost.dateCreatedOn}
          </p>
          <h2 className="text-3xl font-semibold">{currentPost.title}</h2>
          <p className="text-lg">{currentPost.postText}</p>
          {currentPost.imageURL ? (
            <img
              src={currentPost.imageURL}
              alt="post image"
              className="w-full"
            />
          ) : (
            ""
          )}
          <div className="flex space-x-3 items-center">
            <p className="flex items-center space-x-1 text-lg">
              <BsFillHandThumbsUpFill
                size={30}
                onClick={(e) => {
                  handleUpVote();
                  e.stopPropagation();
                }}
                className="icon"
              />
              <span>{currentPost.upVote}</span>
            </p>
            {currentPost?.postOwnerId === currentUser.uid && (
              <div className="flex space-x-3">
                <BsFillTrashFill
                  size={30}
                  className="icon"
                  onClick={handleDelete}
                />
                <BsPencilFill
                  size={30}
                  className="icon"
                  onClick={() =>
                    navigate(`/posts/${id}/edit`, {
                      state: { previousPage: currentHub },
                    })
                  }
                />
              </div>
            )}
          </div>

          <h2>Comments ({currentPost && currentPost.comment?.length})</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <textarea
                name="commentText"
                id="commentText"
                rows="5"
                ref={commentRef}
                placeholder="What are your thoughts?"
                className="inputField"
                required
              />
              <button
                disabled={loading}
                type="submit"
                className="inputFieldButton">
                Comment
              </button>
            </form>
            {currentPost.comment?.map((commentId, i) => (
              <Comment key={i} commentId={commentId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
