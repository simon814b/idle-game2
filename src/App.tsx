import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AdventureBox } from './AdventureBox';

function App() {
  const [gold, setGold] = React.useState(0)
  const gainReward = (r: number) => {
    setGold(gold+r)
  }
  return (
    <div className="App">
      <div>{gold} gold</div>
      <AdventureBox ZoneName='The Beach' SearchTime={10} SearchReward={1} GainReward={gainReward}/>
    </div>
  );
}

export default App;
