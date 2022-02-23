import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import { loginFromLocalStorage } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(loginFromLocalStorage());
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <Logout user={user} />
      <Togglable buttonLabel="create new blog">
        <CreateBlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
