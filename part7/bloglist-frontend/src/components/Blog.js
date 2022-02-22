import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ currentUserId, blog, handleLike, handleRemove }) => {
  const [full, setFull] = useState(false);

  const toggleFull = () => setFull(!full);

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
          {currentUserId === blog.user.id && (
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

Blog.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
