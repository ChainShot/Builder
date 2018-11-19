import React, { Component } from 'react';
import Landing from './components/Landing';
import BuildingBlocks from './components/BuildingBlocks';
import Lessons from './components/Lessons';
import Challenges from './components/Challenges';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/blocks" component={BuildingBlocks} />
          <Route path="/lessons" component={Lessons} />
          <Route path="/challenges" component={Challenges} />
        </div>
      </Router>
    );
  }
}

export default App;
