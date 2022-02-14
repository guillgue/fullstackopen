import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => 
    [...state.anecdotes]
      .filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
      .sort((a, b) => b.votes - a.votes)
  )

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(
      `you voted '${anecdote.content}'`, 5000, notificationId
    ))
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