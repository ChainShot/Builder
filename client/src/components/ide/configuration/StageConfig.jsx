import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import destroyStage from '../../../mutations/stage/destroy';
import StyledSelect from '../../forms/StyledSelect';
import {STAGE_TYPE_OPTIONS, STAGE_LANGUAGE_OPTIONS} from '../../../config';
import confirm from '../../../utils/confirm';
import SVG from '../../SVG';
import './ContainerConfig.scss';
import UpdateService from '../../../redux/services/UpdateService';
import {connect} from 'react-redux';

const variables = [
  ['id', 'String'],
  ['title', 'String'],
  ['language', 'String'],
  ['type', 'String'],
  ['languageVersion', 'String'],
  ['testFramework', 'String'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation modifyStage(${args}) {
  modifyStage(${mapping}) {
    ${returns}
  }
}
`

const languageVersionOptions = [
  { label: 'Solidity v0.4.19', value: '0.4.19' },
  { label: 'Vyper v0.1', value: '0.1.0b3' },
  { label: 'Node 8.x', value: '8.x/babel' },
  { label: 'Node 6.x', value: '6.x/babel' },
]

const frameworkOptions = [
  { label: 'Mocha', value: 'mocha_bdd' },
  { label: 'Truffle With Mocha', value: 'truffle_with_mocha' },
]

class StageConfig extends Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { title, id } = nextProps.stage;
  //   if(id !== prevState.id) {
  //      return { title, id };
  //   }
  //   return prevState;
  // }
  // constructor(props) {
  //   super(props);
  //   this.state = { ...props.stage }
  // }
  // handleChange(prop, value) {
  //   this.setState({ [prop]: value });
  //   const { id } = this.props.stage;
  //   apiMutation(mutation, { [prop]: value, id });
  // }
  destroyStage = () => {
    confirm("Are you sure you want to delete this stage?").then(() => {
      const { id } = this.props.stage;
      apiMutation(destroyStage, { id });
    });
  }
  componentWillUnmount() {
    UpdateService.unregister();
  }
  constructor(props) {
    super(props);
    const { stage } = props;
    UpdateService.register(
      { ...stage },
      (props) => apiMutation(mutation, props)
    );
  }
  render() {
    const { title, type, language, languageVersion, testFramework } = UpdateService.getState();
    return (
      <form className="config" ref="container">
        <label>
          <span>Title</span>
          <input type="text" className="styled" value={title}
            onChange={({ target: { value }}) => UpdateService.onUpdate({ title: value })}/>
        </label>

        <StyledSelect
          label="Type"
          onChange={(type) => UpdateService.onUpdate({ type })}
          value={type}
          options={STAGE_TYPE_OPTIONS} />

        <StyledSelect
          label="Language"
          onChange={(language) => UpdateService.onUpdate({ language })}
          value={language}
          options={STAGE_LANGUAGE_OPTIONS} />

        <StyledSelect
          label="Language Version"
          onChange={(languageVersion) => UpdateService.onUpdate({ languageVersion })}
          value={languageVersion}
          options={languageVersionOptions} />

        <StyledSelect
          label="Test Framework"
          onChange={(testFramework) => UpdateService.onUpdate({ testFramework })}
          value={testFramework}
          options={frameworkOptions} />

        <div className="btn btn-primary" onClick={this.destroyStage}>
          <SVG name="trash" />
          Destroy stage { title }
        </div>
      </form>
    )
  }
}


const mapStateToProps = ({ saveState }) => ({ saveState });

export default connect(
  mapStateToProps,
)(StageConfig);
