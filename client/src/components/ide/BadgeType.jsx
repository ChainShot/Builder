import React, { Component } from 'react';
import UpdateWrapper from '../UpdateWrapper';
import BadgeTypeConfig from './configuration/BadgeTypeConfig';
import { withRouter } from 'react-router-dom';
import PropsRoute from '../PropsRoute';

class BadgeType extends Component {
  render() {
    const {
      stageContainer: { stageContainerGroup },
      match: { url, params: { badgeTypeId } }
    } = this.props;
    const badgeType = (stageContainerGroup.badgeTypes || []).find(x => x.id === badgeTypeId);
    if(!badgeType) return null;
    return (
      <div className="badge-type">
        <PropsRoute path={`${url}/`} exact
          key={badgeTypeId}
          component={UpdateWrapper}
          badgeType={badgeType}
          child={BadgeTypeConfig} />
      </div>
    )
  }
}

export default withRouter(BadgeType);
