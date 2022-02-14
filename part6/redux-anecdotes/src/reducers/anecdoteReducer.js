import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE_ANECDOTE':
      return state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : action.data
      )
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer