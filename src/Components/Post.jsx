import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { firestore } from "../firebase_setup/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Post = (props) => {
  const { post, hubType } = props;
  const navigate = useNavigate();

  const handleUpVote = () => {
    let docRef;
    if (hubType === "Anime") {
      docRef = doc(firestore, "AnimePosts", post.id);
    } else if (hubType === "Manga") {
      docRef = doc(firestore, "MangaPosts", post.id);
    }
    updateDoc(docRef, {
      upVote: increment(1),
    });
  };

  return (
    <div
      className="bg-slate-600 py-4 px-3 my-2 rounded-lg text-white space-y-2 hover:cursor-pointer"
      onClick={() => {
        if (hubType === "Anime") {
          navigate(`/posts/${post.id}`, {
            state: { previousPage: "AnimeHub" },
          });
        } else if (hubType === "Manga") {
          navigate(`/posts/${post.id}`, {
            state: { previousPage: "MangaHub" },
          });
        }
      }}>
      <p>Posted by {post.postOwnerName} on {post.dateCreatedOn}</p>
      <h2 className="text-3xl font-semibold">{post.title}</h2>
      <p className="text-lg">{post.postText}</p>
      {post.imageURL ? (
        <img src={post.imageURL} alt="post image" className="w-full" />
      ) : (
        ""
      )}
      <p className="flex items-center space-x-1 text-lg">
        <BsFillHandThumbsUpFill
          size={30}
          onClick={(e) => {
            handleUpVote();
            e.stopPropagation();
          }}
          className="hover:cursor-pointer hover:scale-110 hover:bg-slate-700 transition p-1 rounded-full"
        />
        <span>{post.upVote}</span>
      </p>
    </div>
  );
};

export default Post;
