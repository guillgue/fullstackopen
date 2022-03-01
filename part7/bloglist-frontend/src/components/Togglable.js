import React, { useState, useContext } from "react";
import { Button } from "@mui/material";

const ToggleContext = React.createContext({ toggleVisibility: null });

export const useToggleVisibility = () => {
  return useContext(ToggleContext);
};

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <ToggleContext.Provider value={toggleVisibility}>
          {props.children}
        </ToggleContext.Provider>
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
};

export default Togglable;
