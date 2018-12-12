import React, { Component } from 'react';
import GroupContainer from './GroupContainer';
import filterSCG from '../../queries/stageContainerGroup/filter';
import './GroupList.scss';
import { withRouter } from 'react-router-dom';
import createSCG from '../../mutations/stageContainerGroup/create';
import apiQuery from '../../utils/api/query';
import apiMutation from '../../utils/api/mutation';

class Blocks extends Component {
  state = {
    stageContainerGroups: []
  }
  componentDidMount() {
    const { containerType } = this.props;
    const variables = { filter: `{ "containerType": "${containerType}" }` };
    apiQuery(filterSCG, variables).then(({ stageContainerGroups }) => {
      this.setState({ stageContainerGroups });
    });
  }
  createNew() {
    const { containerType } = this.props;
    apiMutation(createSCG, { containerType }).then((response) => {
      const { stageContainers } = response;
      this.props.history.push(`/content/${stageContainers[0].id}`)
    });
  }
  render() {
    const { stageContainerGroups } = this.state;
    return (
      <div className="group-list">
        <div className="stage-container-groups">
          <div className="container">
            <h2>Create New</h2>
            <p>Build your own from scratch</p>
            <div className="btn btn-primary" onClick={() => this.createNew()}>Create</div>
          </div>
          { stageContainerGroups.map(x => <GroupContainer key={x.id} {...x} />) }
        </div>
      </div>
    );
  }
}

export default withRouter(Blocks);
