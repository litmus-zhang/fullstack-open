import React, { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


function Statistics() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h2>Give Feedback</h2>
      <span>

        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>

      </span>
      <h2>Statistics</h2>
      {
        total === 0 ? <p>No feedback given</p> : <table>
          <thead>
            <tr>
              <th>text</th>
              <th>value</th>
            </tr>
          </thead>

          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={(good - bad) / total} />
          <StatisticLine text="positive" value={good / total * 100} />
        </table>
      }
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Statistics />
    </div>
  )
}

export default App
