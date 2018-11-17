import React, { Component } from 'react';
import api from '../utils/api';

const query = `query {
  stageContainers {
    id
    type
    description
    title
    stageContainerGroupId
    version
    intro
	}
}`;

class Modules extends Component {
  state = {
    stageContainers: []
  }
  componentDidMount() {
    api.post("graphql", { query }).then(({ data: { stageContainers } }) => {
      this.setState({ stageContainers });
    })
  }
  render() {
    const { stageContainers } = this.state;
    return (
      <div>
        <h1> Select a Module </h1>
        { stageContainers.map(stageContainer => (
          <div key={stageContainer.id}> { stageContainer.title } </div>
        ))}
      </div>
    );
  }
}

export default Modules;
