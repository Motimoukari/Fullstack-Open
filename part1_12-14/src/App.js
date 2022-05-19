import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>)

const App = () => {

  const anecdotes = [
  [0, 'If it hurts, do it more often.' ],
  [0, 'Adding manpower to a late software project makes it later!' ],
  [0, 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.' ],
  [0, 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' ],
  [0, 'Premature optimization is the root of all evil.' ],
  [0, 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.' ],
  [0, 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.' ]
  ]

  const [copy, setCopy] = useState([...anecdotes])
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMost] = useState(0)
  const [mostVoted, setVoted] = useState(anecdotes[0][1])

  function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const rndInt = random(0, anecdotes.length - 1)

  const handleClick = () => {
    setSelected(rndInt)
  }

  const handleVote = () => {
    setCopy(copy => [...copy], copy[selected][0] += 1)

    const sortedVotes = [...copy]
    sortedVotes.sort((a,b) => b[0] - a[0])
    
    setMost(sortedVotes[0][0])
    setVoted(sortedVotes[0][1])
  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected][1]}</p>
      <p>has {copy[selected][0]} votes</p>
      <Button handleClick={handleClick} text='next anecdote' />
      <Button handleClick={handleVote} text='vote' />
      <h2>Anecdote with most votes</h2>

      <p>{mostVoted}</p>
      <p>has {mostVotes} votes</p>
      

    </div>
  )
}

export default App