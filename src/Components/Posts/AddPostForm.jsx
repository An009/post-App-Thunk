import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../../Features/postSlice";
import { selectAllUsers } from "../../Features/userSlice";
import { ToastContainer, toast } from "react-toastify";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector(selectAllUsers);
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [requestStatus, setRequestStatus] = useState("idle");
  const handelChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  const canSave =
    [postInfo.title, postInfo.content, postInfo.author].every(Boolean) &&
    requestStatus === "idle";
  const handleAddButton = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          addNewPost({
            title: postInfo.title,
            body: postInfo.content,
            userId: postInfo.author,
          })
        ).unwrap();
        setPostInfo({ title: "", content: "", author: "" });
        toast.success("Post added successfully");
        navigate("/post");
      } catch (err) {
        console.error("failed to sove the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const renderOptions = userList.map((user) => (
    <option className="my-option" key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <div className="addPostForm">
      <h2>Add Post</h2>
      <div className="card p-3 m-auto  ">
        <div className="container d-flex justify-content-center align-items-center p-3">
          <label htmlFor="title">Title:</label>
          <input
            className="form-control mx-3  "
            value={postInfo.title}
            type="text"
            name="title"
            onChange={handelChange}
          />
        </div>
        <div className="container d-flex justify-content-center align-items-center p-3">
          <label htmlFor="author">Author</label>

          <select
            className="form-select mx-3  "
            value={postInfo.author}
            name="author"
            onChange={handelChange}
          >
            {renderOptions}
          </select>
        </div>
        <div className="container d-flex justify-content-center align-items-center p-3 ">
          <label htmlFor="content">Content</label>
          <input
            className="form-control mx-2  "
            value={postInfo.content}
            type="text"
            name="content"
            onChange={handelChange}
          />
          <button
            disabled={canSave ? false : true}
            className="btn btn-outline-secondary "
            onClick={handleAddButton}
          >
            Save
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
export default AddPostForm;
