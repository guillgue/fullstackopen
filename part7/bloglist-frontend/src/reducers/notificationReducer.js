const notificationReducer = (state = null, action) => {
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
        data: null,
      });
    }, time);
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification,
    });
  };
};

export default notificationReducer;
