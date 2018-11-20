import React, { Component } from 'react';
import Landing from './components/selection/Landing';
import BuildingBlocks from './components/selection/BuildingBlocks';
import Lessons from './components/selection/Lessons';
import Challenges from './components/selection/Challenges';
import Versions from './components/selection/Versions';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <Route exact path="/" component={Landing} />
          <Route path="/blocks/:id" component={Versions} />
          <Route path="/lessons/:id" component={Versions} />
          <Route path="/challenges/:id" component={Versions} />
          <Route exact path="/blocks" component={BuildingBlocks} />
          <Route exact path="/lessons" component={Lessons} />
          <Route exact path="/challenges" component={Challenges} />
        </div>
      </Router>
    );
  }
}

export default App;
