import React, { useState, useContext } from "react";

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <ToggleContext.Provider value={toggleVisibility}>
          {props.children}
        </ToggleContext.Provider>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
