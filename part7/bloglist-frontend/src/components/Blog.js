import React, { useState } from "react";
// import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ currentUserId, blog }) => {
  const [full, setFull] = useState(false);

  const toggleFull = () => setFull(!full);

  /* const addLike = async (blog) => {
    try {
      const blogUser = blog.user;
      const returnedBlog = await blogService.addLike(blog);
      returnedBlog.user = blogUser;
      setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)));
      dispatch(
        setNotification(
          {
            type: "success",
            message: `like added to ${returnedBlog.title} by ${returnedBlog.author}`,
          },
          5000
        )
      );
    } catch (exception) {
      console.error(exception);
      dispatch(
        setNotification(
          { type: "error", message: exception.response.data.error },
          5000
        )
      );
    }
  };

  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }
    try {
      await blogService.remove(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (exception) {
      console.error(exception);
    }
  }; */

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
            <button type="button" /*onClick={() => handleLike(blog)}*/>
              like
            </button>
          </div>
          <div className="author-name">{blog.user.name}</div>
          {currentUserId === blog.user.id && (
            <div className="remove">
              <button type="button" /*onClick={() => handleRemove(blog)}*/>
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
