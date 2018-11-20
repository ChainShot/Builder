import React, { Component } from 'react';
import api from '../../utils/api';
import GroupContainer from './GroupContainer';
import filterSCG from '../../queries/stageContainerGroup/filter';
import './GroupList.scss';
import SelectLayout from './SelectLayout';
import { Link } from 'react-router-dom';
import createSCG from '../../mutations/stageContainerGroup/create';
import apiQuery from '../../utils/apiQuery';

class Blocks extends Component {
  state = {
    stageContainerGroups: []
  }
  componentDidMount() {
    const { containerType } = this.props;
    const variables = { filter: `{ "containerType": "${containerType}" }` };
    apiQuery(filterSCG, variables).then(({ data: { stageContainerGroups } }) => {
      this.setState({ stageContainerGroups });
    });
  }
  createNew() {
    const { relativeLink, containerType } = this.props;
    const queryParams = {
      query: createSCG,
      variables: { containerType }
    }
    // api.post("graphql", queryParams).then(({ data: { id, title, containerType }}) => {
    //   debugger;
    // })
  }
  render() {
    const { stageContainerGroups } = this.state;
    const { relativeLink } = this.props;
    return (
      <SelectLayout>
        <div className="group-list">
          <div className="stage-container-groups">
            { stageContainerGroups.map(x => <GroupContainer key={x.id} relativeLink={relativeLink} {...x} />) }
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

export default Blocks;
