import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const best = votes.indexOf(Math.max.apply(Math, votes))

  const setRandomAnecdote = () => (
    setSelected(Math.floor(Math.random() * anecdotes.length))
  )

  const incrementSelectedVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <DisplayAnecdote anecdote={anecdotes[selected]} />
      <DisplayVotes number={votes[selected]} />
      <Button handleClick={incrementSelectedVote} text="vote" />
      <Button handleClick={setRandomAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <DisplayAnecdote anecdote={anecdotes[best]} />
      <DisplayVotes number={votes[best]} />
    </div>
  )
}

const DisplayAnecdote = ({anecdote}) => (
  <div>
    {anecdote}
  </div>
)

const DisplayVotes = ({number}) => (
  <div>
    has {number} votes
  </div>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App
