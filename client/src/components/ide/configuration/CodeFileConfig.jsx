import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import './CodeFileConfig.scss';
import Switch from "react-switch";
import selectTheme from '../../../utils/selectTheme';

const mutation = `
mutation modifyCodeFile($id: String, $name: String) {
  modifyCodeFile(id: $id, title: $name) {
    id
    name
  }
}
`

class CodeFileConfig extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { id } = nextProps.codeFile;
    if(id !== prevState.id) {
       return { ...nextProps.codeFile }
    }
    return prevState;
  }
  constructor(props) {
    super(props);
    this.state = { ...props.codeFile }
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
    const { id } = this.props.codeFile;
    apiMutation(mutation, { [prop]: value, id });
  }
  render() {
    const { name, executablePath, readOnly, hasProgress, executable, testFixture, visible } = this.state;
    return (
      <div className="config" ref="container">
        <label>
          <span>Name</span>
          <input value={name} onChange={({ target: { value }}) => this.handleChange('name', value)}/>
        </label>
        <label>
          <span>Execution Path</span>
          <input value={executablePath} onChange={({ target: { value }}) => this.handleChange('executablePath', value)}/>
        </label>

        <StyledSwitch
          onChange={(x) => this.handleChange('visible', x)} 
          label="Visible to Users?"
          checked={visible} />

        <StyledSwitch
          onChange={(x) => this.handleChange('executable', x)} 
          label="Executable?"
          checked={executable} />

        <StyledSwitch
          onChange={(x) => this.handleChange('hasProgress', x)} 
          label="Mantain User Progress?"
          checked={hasProgress} />

        <StyledSwitch
          onChange={(x) => this.handleChange('readOnly', x)} 
          label="Read Only?"
          checked={readOnly} />

        <StyledSwitch
          onChange={(x) => this.handleChange('testFixture', x)} 
          label="Test File?"
          checked={visible} />
      </div>
    )
  }
}

class StyledSwitch extends Component {
  render() {
    const { label, ...props } = this.props;
    return (
      <label>
        <span>{ label }</span>
        <Switch {...props}
          className="styled-switch"
          onColor="#ff8d21" />
      </label>
    )
  }
}

export default CodeFileConfig;
