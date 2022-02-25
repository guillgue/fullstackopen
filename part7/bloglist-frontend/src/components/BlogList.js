import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogList }) => {
  const sortedBlogs = [...blogList].sort((a, b) => b.likes - a.likes);

  return (
    <div id="bloglist">
      {sortedBlogs.map((blog) => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
