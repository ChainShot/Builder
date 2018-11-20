import React, { Component } from 'react';
import RelativeLink from '../common/RelativeLink';
import './Sidebar.scss';

class StageContainer extends Component {
  render() {
    const { stageContainer } = this.props;
    return (
      <div className="stage-container-sidebar">
        <ul className="stages">
          <li>
            <RelativeLink keepParts={4} to="configuration">
              Configuration
            </RelativeLink>
          </li>
          {stageContainer.stages.map(({id, title}) => (
            <li>
              <RelativeLink keepParts={4} to={`stage/${id}`}>
                {title}
              </RelativeLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default StageContainer;
