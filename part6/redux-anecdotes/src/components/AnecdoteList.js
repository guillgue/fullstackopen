import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const notificationId = useSelector(state => state.notification.id)
  const anecdotes = useSelector(state => 
    [...state.anecdotes].sort((a, b) => b.votes - a.votes)
  )

  const vote = (anecdote) => {
    if (notificationId !== null) {
      clearTimeout(notificationId)
    }
    dispatch(voteAnecdote(anecdote.id))
    const newNotifId = setTimeout(() => dispatch(removeNotification()), 5000)
    dispatch(setNotification(newNotifId,`you voted '${anecdote.content}'`))
  }

  return <>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote)}
      />
    )}
  </>
}

export default AnecdoteList