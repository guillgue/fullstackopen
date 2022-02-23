import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { removeBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [full, setFull] = useState(false);

  const toggleFull = () => setFull(!full);

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
  };

  return (
    <div className="blog">
      <div className="title-author-view">
        {blog.title} {blog.author}{" "}
        <button type="button" onClick={toggleFull}>
          {full ? "hide" : "view"}
        </button>
      </div>
      {full && (
        <>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes}
            <button type="button" onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
          <div className="author-name">{blog.user.name}</div>
          {currentUser.id === blog.user.id && (
            <div className="remove">
              <button type="button" onClick={() => handleRemove(blog)}>
                remove
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
