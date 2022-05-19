import { useState } from 'react'

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => (
  <div>
    <p>{props.text} {props.value}</p>
  </div>
)

const Statistics = (props) => {

  if (props.all == 0)  {
    return (<p>no feedback given</p> )
  }

  return (
    <div>
      <p>all {props.all}</p>
      <p>avg {props.avg}</p>
      <p>positive {props.positive}%</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  var all = 0;
  var avg = 0;
  var positive = 100;

  all = good + neutral + bad;
  avg = (good - bad)/all;
  positive = (good/(all))*100;

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
    <div>
      
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
  
    </div>
    <div>
        <h1>statistics</h1>
      </div>

      <table>
        <tbody>
  <tr>
    <td><StatisticsLine text="good" value={good}/></td>
  </tr>
  <tr>
    <td><StatisticsLine text="bad" value={bad}/></td>
  </tr>
  <tr>
    <td><StatisticsLine text="neutral" value={neutral}/></td>
  </tr>
  <tr>
    <td>
    <Statistics all={all} avg={avg} positive={positive}/>
    </td>
  </tr>
  </tbody>
</table>
  </div>
  )
}

export default App