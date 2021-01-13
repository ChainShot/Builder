import React, { Component } from 'react';
import apiQuery from '../../utils/api/query';
import findSCG from '../../queries/stageContainerGroup/find';
import { withRouter } from 'react-router-dom';
import confirm from '../../utils/confirm';
import SelectLayout from './SelectLayout';
import apiMutation from '../../utils/api/mutation';
import createSC from '../../mutations/stageContainer/create';
import destroyStageContainer from '../../mutations/stageContainer/destroy';
import { connect } from 'react-redux';
import { resetIDE } from 'redux/actions';
import './Versions.scss';

const variables = [
  ['id', 'String'],
  ['version', 'String'],
  ['stageContainerGroupId', 'String'],
  ['type', 'String'],
  ['intro', 'String'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');

const duplicateStageContainer = `
mutation duplicateStageContainer(${args}) {
  duplicateStageContainer(${mapping}) {
    id
  }
}
`;

class Versions extends Component {
  state = {
    stageContainerGroup: null
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    apiQuery(findSCG, { id }).then(({ stageContainerGroup }) => {
      this.setState({ stageContainerGroup });
    });
  }
  navigateToVersion = (id) => {
    // ensure the IDE state is empty
    this.props.resetIDE();
    // navigate to this content loaded in the IDE
    this.props.history.push(`/content/${id}`);
  }
  duplicate = (id) => {
    // version, stageContainerGroupId, type, intro
    const { stageContainerGroup } = this.state;
    const stageContainer = stageContainerGroup.stageContainers.find(x => x.id === id);
    const version = `${stageContainer.version} (Copy)`;
    const { stageContainerGroupId, type, intro } = stageContainer;
    apiMutation(duplicateStageContainer, { id, version, stageContainerGroupId, type, intro }).then(({ id }) => {
      // ensure the IDE state is empty
      this.props.resetIDE();
      // navigate to this content loaded in the IDE
      this.props.history.push(`/content/${id}`);
    });
  }
  destroy = (id) => {
    confirm("Are you sure you want to delete this stage container?").then(() => {
      apiMutation(destroyStageContainer, { id }).then(() => {
        const { stageContainerGroup } = this.state;
        apiQuery(findSCG, { id: stageContainerGroup.id }).then(({ stageContainerGroup }) => {
          this.setState({ stageContainerGroup });
        });
      })
    });
  }
  createVersion = () => {
    const { stageContainerGroup: { id } } = this.state;
    apiMutation(createSC, { stageContainerGroupId: id }).then(({ id }) => {
      this.props.history.push(`/content/${id}`);
    });
  }
  render() {
    const { stageContainerGroup } = this.state;
    if(!stageContainerGroup) return null;
    const { stageContainers, title } = stageContainerGroup;
    return (
      <SelectLayout>
        <h1> Pick an existing version for {title} or create a new one! </h1>
        <div className="versions">
          {stageContainers.map(({ version, id }) => (
            <div key={id}>
              <div className="version">
                <div className="title"> { version } </div>
                <div className="actions">
                  <div className="btn" onClick={() => this.navigateToVersion(id)}> Edit </div>
                  <div className="btn" onClick={() => this.duplicate(id)}> Duplicate </div>
                  <div className="btn" onClick={() => this.destroy(id)}> Destroy </div>
                </div>
              </div>
            </div>
          ))}
          <div className="new-version" onClick={this.createVersion}>
            New Version
          </div>
        </div>
      </SelectLayout>
    )
  }
}

const mapDispatchToProps = { resetIDE }

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Versions));
