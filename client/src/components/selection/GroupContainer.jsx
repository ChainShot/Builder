import React, { Component } from 'react';
import './GroupContainer.scss';
import RelativeLink from '../common/RelativeLink';

class LandingContainer extends Component {
  render() {
    const { id, title, description, relativeLink } = this.props;
    return (
      <div className="container">
        <h2> { title } </h2>
        <p> { description } </p>
        <RelativeLink to={id}>
          <div className="btn btn-primary">
            Modify
          </div>
        </RelativeLink>
      </div>
    )
  }
}

export default LandingContainer;
