import React, { Component } from 'react';
import apiQuery from '../../utils/apiQuery';
import findSCG from '../../queries/stageContainerGroup/find';
import { withRouter } from 'react-router-dom';
import RelativeLink from '../common/RelativeLink';
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
    const { stageContainers } = stageContainerGroup;
    const { pathname } = this.props.location;
    return (
      <SelectLayout>
        <div className="versions">
          {stageContainers.map(({ version, id }) => (
            <RelativeLink to={id}>
              <div className="version">
                { version }
              </div>
            </RelativeLink>
          ))}
        </div>
      </SelectLayout>
    )
  }
}

export default withRouter(Versions);
