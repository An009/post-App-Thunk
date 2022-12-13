import React from "react";
import "../../../src/App.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPostById } from "../../Features/postSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
const SpesificPost = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>post not found</h2>
      </section>
    );
  }

  return (
    <div className="spesificPost">
      <div className="postCard">
        <h2>{post.title}</h2>
        <p className="content">{post.body}...</p>
        <div className="postInfo">
          <Link to={`/edit/${post.id}`}>edit Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButtons post={post} />
      </div>
    </div>
  );
};

export default SpesificPost;
