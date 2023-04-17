import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const titleRef = useRef();
  const postTextContentRef = useRef();
  const imageURLRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setError("")
      setLoading(true)
      
    } catch {
      setError("Failed to create post")
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
