import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const notifyWith = (message, type = "success") => {
    if (notification !== null) {
      clearTimeout(notification.timeoutID);
    }
    const timeoutID = setTimeout(() => {
      setNotification(null);
    }, 5000);
    setNotification({
      timeoutID,
      message,
      type,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      notifyWith("logged in");
    } catch (exception) {
      setPassword("");
      notifyWith("Wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    setUser(null);
    notifyWith("logged out");
  };

  const addBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog);
      blogFormRef.current.toggleVisibility();
      returnedBlog.user = {
        id: user.id,
        username: user.username,
        name: user.name,
      };
      setBlogs(blogs.concat(returnedBlog));
      notifyWith(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
    } catch (exception) {
      console.error(exception);
    }
  };

  const addLike = async (blog) => {
    try {
      const blogUser = blog.user;
      const returnedBlog = await blogService.addLike(blog);
      returnedBlog.user = blogUser;
      setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)));
      notifyWith(
        `like added to ${returnedBlog.title} by ${returnedBlog.author}`
      );
    } catch (exception) {
      console.error(exception);
      notifyWith(exception.response.data.error, "error");
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
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm createBlog={addBlog} />
      </Togglable>
      <div id="bloglist">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            currentUserId={user.id}
            blog={blog}
            handleLike={addLike}
            handleRemove={removeBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
