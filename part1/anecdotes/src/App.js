import React, { useState } from 'react'
import { getAnecdoteWithMostVotes } from './util';

function App() {
  const anecdotes = [
    { text: 'If it hurts, do it more often', vote: 1 },
    { text: 'Adding manpower to a late software project makes it later!', vote: 1 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 1 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0 },
    { text: 'Premature optimization is the root of all evil.', vote: 1 }, { text: 'Debugging is twice as hard as writing the code in the first place', vote: 1 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients', vote: 1 }
  ]

  //const anecdotesCopy = [...anecdot
  const anectodeWithMostVotes = getAnecdoteWithMostVotes(anecdotes)

  const [selected, setSelected] = useState(0)

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleVote = (selected) => {
      const copy = [...anecdotes]
      copy[selected].vote += 1
      console.log(copy)
      return copy
  }
  console.log(anectodeWithMostVotes.vote)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].vote} votes</p>
      <button onClick={handleClick}>next anecdote⏩</button>
      <button onClick={handleVote(selected)}>vote 💃</button>
      <h1>Anecdote with most votes</h1>
      <p>{anectodeWithMostVotes.text}</p>
      <p>has {anectodeWithMostVotes.vote} votes</p>
    </div>
  )
}

export default App
