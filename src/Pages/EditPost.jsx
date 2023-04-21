import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../firebase_setup/firebase";
import { doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import PostForm from "../Components/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const [error, setError] = useState("");
  const [currentPost, setCurrentPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef();
  const postTextContentRef = useRef();
  const imageURLRef = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      updateDoc(docRef, {
        title: titleRef.current.value,
        postText: postTextContentRef.current.value,
        imageURL: imageURLRef.current.value,
      }).then(
        navigate(`/posts/${id}`, {
          state: { previousPage: currentHub },
        })
      );
    } catch {
      setError("Failed to edit post");
    }
    setLoading(false);
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

  return (
    <div className="grid grid-cols-3">
      <div className="col-start-2">
        <h1 className="text-center text-6xl font-semibold text-white my-4">
          Edit Post
        </h1>
        {error && alert(error)}
        <PostForm
          handleSubmit={handleSubmit}
          titleRef={titleRef}
          postTextContentRef={postTextContentRef}
          imageURLRef={imageURLRef}
          loading={loading}
          defaultTitle={currentPost.title}
          defaultText={currentPost.postText}
          defaultImageURL={currentPost.imageURL}
          formType="Edit"
        />
        <div className="grid grid-cols-5">
          <button
            onClick={handleDelete}
            className="bg-red-500 col-start-3 my-7 rounded-full py-0.5 text-lg text-white hover:bg-red-700 transition">
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
