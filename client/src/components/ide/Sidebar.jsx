import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

class StageContainer extends Component {
  render() {
    const { stageContainer } = this.props;
    return (
      <div className="stage-container-sidebar">
        <ul className="stages">
          <li>
            <Link to="configuration">
              Configuration
            </Link>
          </li>
          {stageContainer.stages.map(({id, title}) => (
            <li>
              <Link to={`stage/${id}`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default StageContainer;
