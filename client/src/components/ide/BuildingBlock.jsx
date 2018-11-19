import React, { Component } from 'react';
import Config from './Config';
import api from '../../utils/api';
import findSCG from '../../queries/stageContainerGroup/find';
import './BuildingBlock.scss';

class BuildingBlock extends Component {
  state = {
    stageContainerGroup: null
  }
  componentDidMount() {
      const {id} = this.props.match.params;
      const queryParams = {
        query: findSCG,
        variables: { id }
      }
      api.post("graphql", queryParams).then(({ data: { stageContainerGroup } }) => {
        this.setState({ stageContainerGroup });
      })
  }
  render() {
    const { stageContainerGroup } = this.state;
    return (
      <div className="building-block">
        { stageContainerGroup && stageContainerGroup.title }
      </div>
    )
  }
}

export default BuildingBlock;
