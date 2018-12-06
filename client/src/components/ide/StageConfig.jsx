import React, { Component } from 'react';
import Select from 'react-select';
import Switch from "react-switch";
import apiMutation from '../../utils/api/mutation';
import selectTheme from '../../utils/selectTheme';
import './ContainerConfig.scss';

const typeOptions = [
  { label: 'Challenge', value: 'Challenge' },
  { label: 'Building Block', value: 'BuildingBlock' },
  { label: 'Lesson', value: 'Lesson' },
]

const mutation = `
mutation modifyStage($id: String, $title: String) {
  modifyStage(id: $id, title: $title) {
    id
    title
  }
}
`

class StageConfig extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { title, id } = nextProps.stage;
    if(id !== prevState.id) {
       return { title, id };
    }
    return prevState;
  }
  constructor(props) {
    super(props);
    const { title, id } = props.stage;
    this.state = { title, id }
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
    const { id } = this.props.stage;
    apiMutation(mutation, { [prop]: value, id });
  }
  render() {
    const { title } = this.state;
    return (
      <div className="config" ref="container">
        <label>
          <span>Title</span>
          <input value={title} onChange={({ target: { value }}) => this.handleChange('title', value)}/>
        </label>
      </div>
    )
  }
}

export default StageConfig;
