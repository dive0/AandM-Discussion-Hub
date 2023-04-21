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
      updateDoc(docRef, {
        comment: arrayUnion({
          user: currentUser.uid,
          dateCreatedOn: new Date().toLocaleString(),
          commentText: commentRef.current.value,
        }),
      });
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
          <p>Posted on {currentPost.dateCreatedOn}</p>
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
                className="hover:cursor-pointer hover:scale-110 hover:bg-slate-700 transition p-1 rounded-full"
              />
              <span>{currentPost.upVote}</span>
            </p>
            {currentPost?.postOwner === currentUser.uid && (
              <div className="flex space-x-3">
                <BsFillTrashFill
                  size={30}
                  className="hover:cursor-pointer hover:scale-110 hover:bg-slate-700 transition p-1 rounded-full"
                  onClick={handleDelete}
                />
                <BsPencilFill
                  size={30}
                  className="hover:cursor-pointer hover:scale-110 hover:bg-slate-700 transition p-1 rounded-full"
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
                className="w-full rounded-xl py-1 px-2  bg-slate-800 hover:bg-slate-900 focus:bg-slate-900"
                required
              />
              <button
                disabled={loading}
                type="submit"
                className="ml-auto bg-blue-700 block rounded-full py-1 px-2 hover:bg-blue-900 transition mb-4">
                Comment
              </button>
            </form>

            {currentPost.comment?.map((comment, i) => (
              <Comment key={i} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
