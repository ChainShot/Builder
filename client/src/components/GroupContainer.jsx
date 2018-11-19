import React, { Component } from 'react';
import './GroupContainer.scss';

class LandingContainer extends Component {
  render() {
    const { title, description } = this.props;
    return (
      <div className="container">
        <h2> { title } </h2>
        <p> { description } </p>
        <div className="btn btn-primary">
          Modify
        </div>
      </div>
    )
  }
}

export default LandingContainer;
