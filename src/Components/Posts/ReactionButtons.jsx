import { useDispatch } from "react-redux";
import { addReactions } from "../../Features/postSlice";

const reactionEmoji = {
  like: "👍",
  wow: "😮",
  heart: "❤️",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="btn btn-outline-primary me-2"
        onClick={() =>
          dispatch(addReactions({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
/* this line can be replaced by 
    for(const[name,emoji] of object.entries(reactionEmoji)){
      return (
        <button key={name}
        onClick={()=>dispatch(addReactions({id:post.id,reaction:name}))}>
        {emoji} {post.reactions[name]}
        </button>
      )
    } */
