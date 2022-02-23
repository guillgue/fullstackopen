import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      const { token, ...info } = user;
      blogService.setToken(token);

      dispatch({
        type: "SET_USER",
        data: { token, info },
      });
      dispatch(
        setNotification({ type: "success", message: "logged in" }, 5000)
      );
    } catch (error) {
      console.log("Login error: wrong username or password");
      dispatch(
        setNotification(
          { type: "error", message: "Wrong username or password" },
          5000
        )
      );
    }
  };
};

export const loginFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const { token, ...info } = user;
      blogService.setToken(token);

      dispatch({
        type: "SET_USER",
        data: { token, info },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);

    dispatch({
      type: "SET_USER",
      data: null,
    });
  };
};

export default userReducer;
