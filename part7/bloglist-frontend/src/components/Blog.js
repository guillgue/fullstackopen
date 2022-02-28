import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { removeBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.info);

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog));
    dispatch(
      setNotification(
        {
          type: "success",
          message: `like added to ${blog.title} by ${blog.author}`,
        },
        5000
      )
    );
  };

  const handleRemove = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }
    dispatch(removeBlog(blog));
    dispatch(
      setNotification(
        {
          type: "success",
          message: `${blog.title} by ${blog.author} removed`,
        },
        5000
      )
    );
    navigate("/");
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className="url">{blog.url}</div>
      <div className="likes">
        likes {blog.likes}
        <button type="button" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <div className="author-name">added by {blog.user.name}</div>
      {currentUser.id === blog.user.id && (
        <div className="remove">
          <button type="button" onClick={() => handleRemove(blog)}>
            remove
          </button>
        </div>
      )}
      <h2>comments</h2>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
