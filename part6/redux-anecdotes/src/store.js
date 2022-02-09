import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from '@redux-devtools/extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer, devToolsEnhancer())

export default store