import React, { Component } from 'react';
import './GroupContainer.scss';
import { Link } from 'react-router-dom';
import SVG from '../SVG';
import confirm from '../../utils/confirm';

class LandingContainer extends Component {
  destroy = () => {
    confirm("Are you sure you want to delete this Content?").then(() => {
      this.props.destroyGroup(this.props.id);
    });
  }
  render() {
    const { id, title, description } = this.props;
    return (
      <div className="container">
        <h2> { title } </h2>
        <p> { description } </p>
        <div className="actions">
          <Link to={`/versions/${id}/`}>
            <div className="btn btn-primary">
              <SVG name="pencil" />
              <div> Modify </div>
            </div>
          </Link>
          <div className="btn btn-primary" onClick={this.destroy}>
            <SVG name="trash" />
            <div> Delete </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingContainer;
