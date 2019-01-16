import React, { Component } from 'react';
import GroupContainer from './GroupContainer';
import filterSCG from '../../queries/stageContainerGroup/filter';
import './GroupList.scss';
import { withRouter } from 'react-router-dom';
import createSCG from '../../mutations/stageContainerGroup/create';
import destroySCG from '../../mutations/stageContainerGroup/destroy';
import apiQuery from '../../utils/api/query';
import apiMutation from '../../utils/api/mutation';
import SVG from '../SVG';

class GroupList extends Component {
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
  destroyGroup = (id) => {
    apiMutation(destroySCG, { id }).then(() => {
      const idx = this.state.stageContainerGroups.findIndex(x => x.id === id);
      this.setState({
        stageContainerGroups: [
          ...this.state.stageContainerGroups.slice(0, idx),
          ...this.state.stageContainerGroups.slice(idx + 1)
        ]
      })
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
            <div className="btn btn-primary" onClick={() => this.createNew()}>
              <SVG name="file-plus" />
              <div> Create </div>
            </div>
          </div>
          { stageContainerGroups.map(x => <GroupContainer destroyGroup={this.destroyGroup} key={x.id} {...x} />) }
        </div>
      </div>
    );
  }
}

export default withRouter(GroupList);
