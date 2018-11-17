import React, { Component } from 'react';

class LandingContainer extends Component {
  render() {
    const { title, description } = this.props;
    return (
      <div className="container">
        <h2> { title } </h2>
        <p> { description } </p>
      </div>
    )
  }
}

export default LandingContainer;
