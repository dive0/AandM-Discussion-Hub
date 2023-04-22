import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase_setup/firebase";

const Comment = (props) => {
  const { commentId } = props;
  const [comment, setComment] = useState({});

  const commentRef = doc(firestore, "Comment", commentId.commentId);

  useEffect(() => onSnapshot(commentRef, (doc) => setComment(doc.data())), []);
  return (
    <div className="my-3 bg-slate-700 p-3 rounded-lg">
      <p className="text-sm text-gray-300">
        Commented by {comment.replierName} on {comment.dateCreatedOn}
      </p>
      <p className="text-lg">{comment.commentText}</p>
    </div>
  );
};

export default Comment;
