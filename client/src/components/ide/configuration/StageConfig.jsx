import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import destroyStage from '../../../mutations/stage/destroy';
import StyledSelect from '../../forms/StyledSelect';
import {STAGE_TYPE_OPTIONS, STAGE_LANGUAGE_OPTIONS} from '../../../config';
import confirm from '../../../utils/confirm';
import SVG from '../../SVG';
import './ContainerConfig.scss';

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
  constructor(props) {
    super(props);
    props.onSave(({ stage }) => apiMutation(mutation, stage));
  }
  destroyStage = () => {
    confirm("Are you sure you want to delete this stage?").then(() => {
      const { id } = this.props.stage;
      apiMutation(destroyStage, { id });
    });
  }
  render() {
    const { update,
       stage: { title, type, language, languageVersion, testFramework }
     } = this.props;
    const updateStage = (state) => update({ stage: state })
    return (
      <form className="config" ref="container">
        <label>
          <span>Title</span>
          <input type="text" className="styled" value={title}
            onChange={({ target: { value }}) => updateStage({ title: value })}/>
        </label>

        <StyledSelect
          label="Type"
          onChange={(type) => updateStage({ type })}
          value={type}
          options={STAGE_TYPE_OPTIONS} />

        <StyledSelect
          label="Language"
          onChange={(language) => updateStage({ language })}
          value={language}
          options={STAGE_LANGUAGE_OPTIONS} />

        <StyledSelect
          label="Language Version"
          onChange={(languageVersion) => updateStage({ languageVersion })}
          value={languageVersion}
          options={languageVersionOptions} />

        <StyledSelect
          label="Test Framework"
          onChange={(testFramework) => updateStage({ testFramework })}
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

export default StageConfig;
