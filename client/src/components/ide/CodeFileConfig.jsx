import React, { Component } from 'react';
import apiMutation from '../../utils/api/mutation';
import './CodeFileConfig.scss';

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
    const { name, id } = nextProps.codeFile;
    if(id !== prevState.id) {
       return { name, id };
    }
    return prevState;
  }
  constructor(props) {
    super(props);
    const { name, id } = props.codeFile;
    this.state = { name, id }
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
    const { id } = this.props.codeFile;
    apiMutation(mutation, { [prop]: value, id });
  }
  render() {
    const { name } = this.state;
    return (
      <div className="config" ref="container">
        <label>
          <span>Name</span>
          <input value={name} onChange={({ target: { value }}) => this.handleChange('name', value)}/>
        </label>
      </div>
    )
  }
}

export default CodeFileConfig;
