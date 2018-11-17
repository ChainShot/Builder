import React, { Component } from 'react';
import Landing from './components/Landing';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Landing />
      </div>
    );
  }
}

export default App;
