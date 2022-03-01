import React from "react";
import { Alert } from "@mui/material";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <Alert severity={notification.type}>{notification.message}</Alert>;
};

export default Notification;
