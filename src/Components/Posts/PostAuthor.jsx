import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../Features/userSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);
  return <div>{author ? author.name : "unknown author"}</div>;
};

export default PostAuthor;
