import React, { Component } from 'react';
import Dialog from '../../Dialog';
import PaneSwitch from '../../forms/PaneSwitch';
import './AddStage.scss';
import NewStageTemplate from './NewStageTemplate';
import NewStage from './NewStage';

class AddStage extends Component {
  state = {
    title: "",
  }
  handleChange(prop, value) {
    this.setState({[prop]: value});
  }
  render() {
    const { title } = this.state;
    const { containerId } = this.props;
    return (
      <Dialog title="New Stage" className="add-stage">
        <form>
          <div className="shared">
            <label>
              <span>Title</span>
              <input type="text" className="styled" value={title}
                onChange={({ target }) => this.handleChange('title', target.value)}/>
            </label>
          </div>

          <PaneSwitch
            labels={['From Template', 'Blank Stage']}>
            <NewStageTemplate title={title} containerId={containerId}/>
            <NewStage title={title} containerId={containerId}/>
          </PaneSwitch>
        </form>
      </Dialog>
    );
  }
}

export default AddStage;
