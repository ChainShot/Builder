import React, { Component } from 'react';
import Config from './Config';
import apiQuery from '../../utils/apiQuery';
import findSCG from '../../queries/stageContainerGroup/find';
import './BuildingBlock.scss';

class BuildingBlock extends Component {
  state = {
    stageContainerGroup: null
  }
  componentDidMount() {
      const {id} = this.props.match.params;
      apiQuery(findSCG, { id }).then(({ data: { stageContainerGroup } }) => {
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
