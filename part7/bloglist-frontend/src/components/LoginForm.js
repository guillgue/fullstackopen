import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(login(username, password));
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="username"
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="text" type="submit">
        login
      </Button>
    </form>
  );
};

export default LoginForm;
