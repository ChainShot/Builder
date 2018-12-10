import React, { Component } from 'react';
import apiQuery from '../../utils/api/query';
import findSCG from '../../queries/stageContainerGroup/find';
import { withRouter, Link } from 'react-router-dom';
import SelectLayout from './SelectLayout';
import './Versions.scss';

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
  render() {
    const { stageContainerGroup } = this.state;
    if(!stageContainerGroup) return null;
    const { stageContainers, title } = stageContainerGroup;
    return (
      <SelectLayout>
        <h1> Pick an existing version for {title} or create a new one! </h1>
        <p>
          Content can have multiple versions to support different libraries
          or languages. For instance, one lesson version might be Solidity while another
          is Vyper. Or one might use ethers.js rather than web3.js.
        </p>
        <div className="versions">
          {stageContainers.map(({ version, id }) => (
            <Link key={id} to={`/content/${id}/`}>
              <div className="version">
                Select { version }
              </div>
            </Link>
          ))}
          <div className="version">
            Create a new Version
          </div>
        </div>
      </SelectLayout>
    )
  }
}

export default withRouter(Versions);
