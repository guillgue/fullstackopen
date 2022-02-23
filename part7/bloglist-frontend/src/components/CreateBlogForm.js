import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggleVisibility } from "./Togglable";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.info);

  const toggleVisibility = useToggleVisibility();

  const addBlog = async (event) => {
    event.preventDefault();
    dispatch(createBlog(currentUser, { title, author, url }));
    dispatch(
      setNotification(
        {
          type: "success",
          message: `a new blog ${title} by ${author} added`,
        },
        5000
      )
    );
    setTitle("");
    setAuthor("");
    setUrl("");
    toggleVisibility();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
