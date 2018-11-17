import React, { Component } from 'react';
import Landing from './components/Landing';
import Header from './components/Header';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <Landing />
      </div>
    );
  }
}

export default App;
