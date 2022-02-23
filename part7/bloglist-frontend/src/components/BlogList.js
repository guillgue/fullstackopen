import React, { useEffect } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";

const BlogList = ({ user }) => {
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
        <Blog key={blog.id} currentUserId={user.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
