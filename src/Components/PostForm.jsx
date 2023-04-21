import React from "react";

const PostForm = (props) => {
  const { handleSubmit, titleRef, postTextContentRef, imageURLRef, loading, defaultTitle, defaultText, defaultImageURL, formType } =
    props;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-600 py-3 px-5 space-y-1 text-white">
      <input
        type="text"
        id="title"
        name="title"
        ref={titleRef}
        placeholder="Title"
        required
        className="inputField"
        defaultValue={defaultTitle}
      />
      <textarea
        name="postTextContent"
        id="postTextContent"
        rows="5"
        placeholder="Text (optional)"
        ref={postTextContentRef}
        className="inputField"
        defaultValue={defaultText}
      />
      <input
        type="url"
        id="imageURL"
        name="imageURL"
        ref={imageURLRef}
        placeholder="Image URL (optional)"
        className="inputField"
        defaultValue={defaultImageURL}
      />
      <button disabled={loading} type="submit" className="inputFieldButton">
        {formType === "Create" ? "Create Post" : "Edit Post"}
      </button>
    </form>
  );
};

export default PostForm;
