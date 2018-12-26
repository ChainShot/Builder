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
    return (
      <Dialog title="New Stage" className="add-stage">
        <form>
          <div className="shared">
            <label>
              <span>Title</span>
              <input value={title} onChange={(...args) => this.handleChange('title', ...args)}/>
            </label>
          </div>

          <PaneSwitch
            labels={['From Template', 'Blank Stage']}>
            <NewStageTemplate title={title}/>
            <NewStage title={title}/>
          </PaneSwitch>
        </form>
      </Dialog>
    );
  }
}

export default AddStage;
