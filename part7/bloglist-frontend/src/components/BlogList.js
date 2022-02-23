import React, { useEffect } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";

const BlogList = ({ currentUser }) => {
  const dispatch = useDispatch();

  const sortedBlogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div id="bloglist">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} currentUser={currentUser} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
