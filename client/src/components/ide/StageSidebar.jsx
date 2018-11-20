import React, { Component } from 'react';
import RelativeLink from '../common/RelativeLink';
import './StageSidebar.scss';

class StageSidebar extends Component {
  render() {
    const { stage } = this.props;
    return (
      <div className="stage-sidebar">
        <ul className="files">
          <li>
            <RelativeLink keepParts={6} to="configuration">
              Configuration
            </RelativeLink>
          </li>
          {stage.codeFiles.map(({id, name}) => (
            <li>
              <RelativeLink keepParts={6} to={`file/${id}`}>
                {name}
              </RelativeLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default StageSidebar;
