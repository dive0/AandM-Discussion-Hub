const Comment = (props) => {
  const {comment} = props;

  return (
    <div className="my-3 bg-slate-700 p-3 rounded-lg">
      <p className="text-sm text-gray-300">Commented by {comment.user} on {comment.dateCreatedOn}</p>
      <p className="text-lg">{comment.commentText}</p>
    </div>
  )
}

export default Comment