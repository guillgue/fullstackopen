const initialState = {
  id: null,
  message: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      message: null,
      id: null
    }
  }
}

export const setNotification = (message, time, oldNotifId) => {
  return async dispatch => {
    if (oldNotifId !== null) {
      clearTimeout(oldNotifId)
    }
    const newNotifId = setTimeout(() => 
      dispatch(removeNotification()), time
    )
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        id: newNotifId,
        message
      }
    })
  }
}

export default notificationReducer