import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { firestore } from "../firebase_setup/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Post = (props) => {
  const { post } = props;

  const handleUpVote = () => {
    let docRef;
    if (window.location.pathname === "/") {
      docRef = doc(firestore, "AnimePosts", post.id);
    } else if (window.location.pathname === "/manga-hub") {
      docRef = doc(firestore, "MangaPosts", post.id);
    }
    updateDoc(docRef, {
      upVote: post.upVote + 1,
    });
  };

  return (
    <div className="bg-slate-600 py-4 px-3 my-2 rounded-lg text-white space-y-2">
      <p>Posted on {post.dateCreatedOn}</p>
      <h2 className="text-3xl font-semibold">{post.title}</h2>
      <p className="text-lg">{post.postText}</p>
      {post.imageURL ? (
        <img src={post.imageURL} alt="post image" className="w-full" />
      ) : (
        ""
      )}
      <p className="flex space-x-1">
        <BsFillHandThumbsUpFill
          size={20}
          onClick={handleUpVote}
          className="hover:cursor-pointer hover:scale-110 transition"
        />
        <span>{post.upVote}</span>
      </p>
    </div>
  );
};

export default Post;
