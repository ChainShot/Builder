import React, { Component } from 'react';
import api from '../../utils/api';
import GroupContainer from './GroupContainer';
import filterSCG from '../../queries/stageContainerGroup/filter';
import './GroupList.scss';
import SelectLayout from './SelectLayout';
import { Link, withRouter } from 'react-router-dom';
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
    apiMutation(createSCG, { containerType }).then(({ id, title, containerType }) => {
      this.props.history.push(`/versions/${id}/`)
    })
  }
  render() {
    const { stageContainerGroups } = this.state;
    return (
      <SelectLayout>
        <div className="group-list">
          <div className="stage-container-groups">
            { stageContainerGroups.map(x => <GroupContainer key={x.id} {...x} />) }
            <div className="container">
              <h2>Create your Own!</h2>
              <p>Build your own from scratch</p>
              <div className="btn btn-primary" onClick={() => this.createNew()}>Create</div>
            </div>
          </div>
        </div>
      </SelectLayout>
    );
  }
}

export default withRouter(Blocks);
