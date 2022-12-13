import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./Posts/PostAuthor";
import ReactionButtons from "./Posts/ReactionButtons";
import TimeAgo from "./Posts/TimeAgo";

const Post = ({ post }) => {
  return (
      <div className="postCard">
        <h2>{post.title}</h2>
        <p className="content">{post.body.substring(0, 80)}...</p>
        <div className="postInfo">
          <Link to={`/post/${post.id}`}>View Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButtons post={post} />
      </div>
  );
};

export default Post;
