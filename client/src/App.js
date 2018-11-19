import React, { Component } from 'react';
import Landing from './components/selection/Landing';
import BuildingBlocks from './components/selection/BuildingBlocks';
import Lessons from './components/selection/Lessons';
import Challenges from './components/selection/Challenges';
import BuildingBlock from './components/ide/BuildingBlock';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <Route exact path="/" component={Landing} />
          <Route path="/blocks/:id" component={BuildingBlock} />
          <Route exact path="/blocks" component={BuildingBlocks} />
          <Route path="/lessons" component={Lessons} />
          <Route path="/challenges" component={Challenges} />
        </div>
      </Router>
    );
  }
}

export default App;
