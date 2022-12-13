import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { editPost, selectPostById } from "../../Features/postSlice";
import { selectAllUsers } from "../../Features/userSlice";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const userList = useSelector(selectAllUsers);
  const [postInfo, setPostInfo] = useState({
    title: post?.title,
    content: post?.body,
    author: post?.author,
  });
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const handelChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
    console.log(postInfo);
  };

  const canSave =
    [postInfo.title, postInfo.content, postInfo.author].every(Boolean) &&
    requestStatus === "idle";
  const handleEditButton = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          editPost({
            id: post.id,
            title: postInfo.title,
            body: postInfo.content,
            author: postInfo.author,
            reactions: post.reactions,
          })
        ).unwrap();
        setPostInfo({ title: "", content: "", author: "" });
        toast.success('Post Edited successfully');
        navigate('/post');
      } catch (err) {
        console.error("failed to edit the post", err);
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
            onClick={handleEditButton}
          >
            edit
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditPost;
