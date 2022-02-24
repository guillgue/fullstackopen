import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Users from "./components/Users";
import User from "./components/User";
import { loginFromLocalStorage } from "./reducers/userReducer";
import userService from "./services/users";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    dispatch(loginFromLocalStorage());
  }, []);

  useEffect(() => {
    userService.getAll().then((list) => setUserList(list));
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new blog">
                <CreateBlogForm />
              </Togglable>
              <BlogList />
            </>
          }
        />
        <Route path="/users" element={<Users userList={userList} />} />
        <Route path="/users/:id" element={<User userList={userList} />} />
      </Routes>
    </div>
  );
};

export default App;
