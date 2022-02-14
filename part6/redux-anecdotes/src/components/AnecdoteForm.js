import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const notifId = useSelector(state => state.notification.id)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (notifId !== null) {
      clearTimeout(notifId)
    }
    dispatch(createAnecdote(content))
    const newNotifId = setTimeout(() => dispatch(removeNotification()), 5000)
    dispatch(setNotification(newNotifId,`you created '${content}'`))
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  </>
}

export default AnecdoteForm