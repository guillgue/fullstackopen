import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  let userInfo = null;
  if (user) {
    userInfo = { ...user };
    delete userInfo.token;
  }

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  // const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(
        setNotification({ type: "success", message: "logged in" }, 5000)
      );
    } catch (exception) {
      setPassword("");
      dispatch(
        setNotification(
          { type: "error", message: "Wrong username or password" },
          5000
        )
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    setUser(null);
    dispatch(setNotification({ type: "success", message: "logged out" }, 5000));
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
      <Togglable buttonLabel="create new blog">
        <CreateBlogForm currentUser={userInfo} />
      </Togglable>
      <BlogList currentUser={userInfo} />
    </div>
  );
};

export default App;
