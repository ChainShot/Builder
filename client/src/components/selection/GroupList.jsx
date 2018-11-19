import React, { Component } from 'react';
import api from '../../utils/api';
import GroupContainer from './GroupContainer';
import filterSCG from '../../queries/stageContainerGroup/filter';
import './GroupList.scss';
import SelectLayout from './SelectLayout';
import { Link } from 'react-router-dom';

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
    const { relativeLink } = this.props;
    return (
      <SelectLayout>
        <div className="group-list">
          <div className="stage-container-groups">
            { stageContainerGroups.map(x => <GroupContainer key={x.id} relativeLink={relativeLink} {...x} />) }
            <div className="container">
              <h2>Create your Own!</h2>
              <p>Build your own from scratch</p>
              <Link to={`${relativeLink}/new`}>
                <div className="btn btn-primary">Create</div>
              </Link>
            </div>
          </div>
        </div>
      </SelectLayout>
    );
  }
}

export default Blocks;
