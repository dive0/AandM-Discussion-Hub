import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { useAuth } from "../Contexts/AuthContext";
import PostForm from "../Components/PostForm";

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
      createdAt: serverTimestamp(),
      dateCreatedOn: new Date().toLocaleString(),
      upVote: 0,
      comment: [],
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
    <div className="grid grid-cols-3">
      <div className="col-start-2">
        <h1 className="text-center text-6xl font-semibold text-white my-4">
          Create A Post
        </h1>
        {error && alert(error)}
        <PostForm
          handleSubmit={handleSubmit}
          titleRef={titleRef}
          postTextContentRef={postTextContentRef}
          imageURLRef={imageURLRef}
          loading={loading}
          defaultTitle=""
          defaultText=""
          defaultImageURL=""
          formType="Create"
        />
      </div>
    </div>
  );
};

export default CreatePost;
