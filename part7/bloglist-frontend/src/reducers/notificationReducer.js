const initialState = {
  type: null,
  message: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

let timeoutId = null;

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: initialState,
      });
    }, time);
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification,
    });
  };
};

export default notificationReducer;
