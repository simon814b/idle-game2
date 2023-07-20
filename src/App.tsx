import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AdventureBox } from './AdventureBox';
import { GlobalContext, Zone } from './Context';
import { Changelog } from './Changelog';

const App = () => {
  const { gold } = React.useContext(GlobalContext)

  return (
    <div className="App">
      <Changelog/>
      <div>{gold} gold</div>
      <AdventureBox ZoneName='The Beach' ZoneId={Zone.Beach} SearchTime={10} BaseReward={1} RewardMultiplier={1} BasePrice={1}/>
      <AdventureBox ZoneName='The Forest' ZoneId={Zone.Forest} SearchTime={60} BaseReward={10} RewardMultiplier={1} BasePrice={10}/>
      <AdventureBox ZoneName='The Mountain' ZoneId={Zone.Mountain} SearchTime={300} BaseReward={100} RewardMultiplier={1} BasePrice={100}/>
    </div>
  );
}

export default App;
