import React, { Component } from 'react';
import api from '../utils/api';
import GroupContainer from './GroupContainer';
import filterSCG from '../queries/filterStageContainerGroups';
import './GroupList.scss';

class Blocks extends Component {
  state = {
    stageContainerGroups: []
  }
  componentDidMount() {
    const { containerType } = this.props;
    const queryParams = {
      query: filterSCG,
      variables: { filter: `{ "containerType": "${containerType}" }` }
    }
    api.post("graphql", queryParams).then(({ data: { stageContainerGroups } }) => {
      this.setState({ stageContainerGroups });
    })
  }
  render() {
    const { stageContainerGroups } = this.state;
    return (
      <div className="group-list">
        <div className="stage-container-groups">
          { stageContainerGroups.map(x => <GroupContainer key={x.id} {...x} />) }
          <div className="container">
            <h2>Create your Own!</h2>
            <p>Build your own from scratch</p>
            <div className="btn btn-primary">Create</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blocks;
