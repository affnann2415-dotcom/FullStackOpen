import { useState } from 'react'

const Statisticline = ({ text,value}) => {
  return (
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
  )
}

const Statisctics = (props) => {
  const all= props.good + props.neutral + props.bad
  
  if (all === 0)
    return (<p>No feedback given</p>)

  const average=((props.good - props.bad) / all)
  const positive=((props.good * 100) / all)
  return (
    <div>
    <h1>statistics</h1>
    <table><tbody>
      <Statisticline text='good' value={props.good} />
      <Statisticline text='neutral' value={props.neutral} />
      <Statisticline text='bad' value={props.bad} />
      <Statisticline text='all' value={all} />
      <Statisticline text='average' value={average} />
      <Statisticline text='positive' value={positive + ' %'} />
    </tbody></table>
    </div>
  )
}

const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good +1)}>good</button>    
      <button onClick={() => setNeutral(neutral +1)}>neutral</button> 
      <button onClick={() => setBad(bad +1)}>bad</button> 
      <Statisctics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App