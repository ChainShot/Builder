import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import destroyStage from '../../../mutations/stage/destroy';
import SVG from '../../SVG';
import './ContainerConfig.scss';

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
  destroyStage = () => {
    const { id } = this.props.stage;
    apiMutation(destroyStage, { id });
  }
  render() {
    const { title } = this.state;
    return (
      <form className="config" ref="container">
        <label>
          <span>Title</span>
          <input value={title} onChange={({ target: { value }}) => this.handleChange('title', value)}/>
        </label>

        <div className="btn btn-primary" onClick={this.destroyStage}>
          <SVG name="trash" />
          Destroy stage { title }
        </div>
      </form>
    )
  }
}

export default StageConfig;
