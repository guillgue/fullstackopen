import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { removeBlog, likeBlog, commentBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [content, setContent] = useState("");

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

  const handleComment = async (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog.id, content));
    dispatch(
      setNotification(
        {
          type: "success",
          message: `comment ${content} added to ${blog.title}`,
        },
        5000
      )
    );
    setContent("");
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
      <div>
        <h2>comments</h2>
        <form onSubmit={handleComment}>
          <input
            id="content"
            type="text"
            value={content}
            name="content"
            onChange={({ target }) => setContent(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
