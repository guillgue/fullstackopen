import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const Logout = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNotification({ type: "success", message: "logged out" }, 5000));
  };

  return (
    <>
      <Button color="inherit" type="button" onClick={handleLogout}>
        logout
      </Button>
      {user.info.name} logged in
    </>
  );
};

export default Logout;
