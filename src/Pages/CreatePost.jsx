import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { useAuth } from "../Contexts/AuthContext";

const CreatePost = (props) => {
  const titleRef = useRef();
  const postTextContentRef = useRef();
  const imageURLRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const addDocument = async (collectionRef, type) => {
    await addDoc(collectionRef, {
      postOwner: currentUser.uid,
      title: titleRef.current.value,
      postText: postTextContentRef.current.value,
      imageURL: imageURLRef.current.value,
    })
      .then(type === "anime" ? navigate("/") : navigate("/manga-hub"))
      .catch((err) =>
        res
          .status(400)
          .send(`Can't add to document to collection with error - ${err}`)
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (location.state.previousPage === "AnimeHub") {
        const animePostsRef = collection(firestore, "AnimePosts");
        addDocument(animePostsRef, "anime");
      } else if (location.state.previousPage === "MangaHub") {
        const mangaPostsRef = collection(firestore, "MangaPosts");
        addDocument(mangaPostsRef, "manga");
      }
    } catch {
      setError("Failed to create post");
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center text-6xl font-semibold text-white my-4">
        Create A Post
      </h1>
      {error && alert(error)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          placeholder="Title"
          required
        />
        <textarea
          name="postTextContent"
          id="postTextContent"
          rows="5"
          className="w-full"
          placeholder="Text (optional)"
          ref={postTextContentRef}
        />
        <input
          type="url"
          id="imageURL"
          name="imageURL"
          ref={imageURLRef}
          placeholder="Image URL (optional)"
        />
        <button disabled={loading} type="submit">
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
