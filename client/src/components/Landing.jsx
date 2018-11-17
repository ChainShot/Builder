import React, { Component } from 'react';
import api from '../utils/api';
import LandingContainer from './LandingContainer';
import './Landing.scss';

const query = `query {
  stageContainerGroups {
    id
    containerType
    description
    title
	}
}`;

class Landing extends Component {
  state = {
    stageContainerGroups: []
  }
  componentDidMount() {
    api.post("graphql", { query }).then(({ data: { stageContainerGroups } }) => {
      this.setState({ stageContainerGroups });
    })
  }
  render() {
    const { stageContainerGroups } = this.state;
    const buildingBlocks = stageContainerGroups.filter(x => x.containerType === 'BuildingBlock');
    const lessons = stageContainerGroups.filter(x => x.containerType === 'Lesson');
    const challenges = stageContainerGroups.filter(x => x.containerType === 'Challenge');
    return (
      <div className="landing">
        <h1> Building Blocks </h1>
        <div className="stage-container-groups building-blocks">
          { buildingBlocks.map(x => <LandingContainer key={x.id} {...x} />) }
          <div className="container">
            <h2>Create your Own!</h2>
            <p>Build your own Building Block from scratch</p>
            <div className="btn btn-primary">Create</div>
          </div>
        </div>
        <h1> Lessons </h1>
        <div className="stage-container-groups lessons">
          { lessons.map(x => <LandingContainer key={x.id} {...x} />) }
          <div className="container">
            <h2>Create your Own!</h2>
            <p>Build your own Lesson from scratch</p>
            <div className="btn btn-primary">Create</div>
          </div>
        </div>
        <h1> Challenges </h1>
        <div className="stage-container-groups challenges">
          { challenges.map(x => <LandingContainer key={x.id} {...x} />) }
          <div className="container">
            <h2>Create your Own!</h2>
            <p>Build your own Challenge from scratch</p>
            <div className="btn btn-primary">Create</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
