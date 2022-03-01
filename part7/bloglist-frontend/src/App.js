import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useMatch, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import UserList from "./components/UserList";
import User from "./components/User";
import { initializeBlogs } from "./reducers/blogReducer";
import { loginFromLocalStorage } from "./reducers/userReducer";
import userService from "./services/users";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const blogList = useSelector((state) => state.blogs);

  const [userList, setUserList] = useState([]);

  const blogMatch = useMatch("/blogs/:id");
  const selectedBlog = blogMatch
    ? blogList.find((b) => b.id === blogMatch.params.id)
    : null;

  const userMatch = useMatch("/users/:id");
  const selectedUser = userMatch
    ? userList.find((u) => u.id === userMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(loginFromLocalStorage());
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    userService.getAll().then((list) => setUserList(list));
  }, []);

  if (loggedUser === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm />
      </Container>
    );
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <Logout user={loggedUser} />
        </Toolbar>
      </AppBar>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new blog">
                <CreateBlogForm />
              </Togglable>
              <BlogList blogList={blogList} />
            </>
          }
        />
        <Route path="/blogs/:id" element={<Blog blog={selectedBlog} />} />
        <Route path="/users" element={<UserList userList={userList} />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
      </Routes>
    </Container>
  );
};

export default App;
