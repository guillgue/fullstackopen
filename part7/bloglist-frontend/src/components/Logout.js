import React from "react";
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
      {user.info.name} logged in{" "}
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </>
  );
};

export default Logout;
