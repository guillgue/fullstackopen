const notificationReducer = (state = 'initial notification', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default notificationReducer