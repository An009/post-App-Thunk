import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostError,
  getPostStatus,
} from "../../Features/postSlice";
import Post from "../Post";
import Spinner from "./Spinner";


const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  let content;
  if (postStatus === "loading") {
    content = <Spinner />;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post, index) => (
      <Post key={index} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
};

export default PostList;
