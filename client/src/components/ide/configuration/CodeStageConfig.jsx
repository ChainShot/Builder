import React, { Component } from 'react';
import StyledSelect from '../../forms/StyledSelect';
import StyledInput from '../../forms/StyledInput';
import {STAGE_LANGUAGE_OPTIONS} from '../../../config';

const LANGUAGE_HINT = 'The execution environment language';
const LANGUAGE_VERSION_HINT = 'The programming language build';
const TEST_FRAMEWORK_HINT = 'The framework used for test assertions';
const FORK_MAINNET_BLOCK_HINT = 'The block from which to fork the mainnet Ethereum blockchain';

const languageVersionOptions = [
  { label: 'Solidity v0.6.2', value: '0.6.2' },
  { label: 'Solidity v0.7.5', value: '0.7.5' },
  { label: 'Node 10.x', value: '10.x' },
  { label: 'Node 10.x w/ Babel', value: '10.x/babel' },
]

const frameworkOptions = [
  { label: 'JavaScript Mocha', value: 'mocha_bdd' },
  { label: 'Hardhat Solidity', value: 'truffle_with_mocha' },
]

class CodeStageConfig extends Component {
  render() {
    const { onChange,
      stage: { type, language, languageVersion, testFramework, forkBlockNumber }
    } = this.props;
    if(type !== 'CodeStage') return null;
    return (
      <React.Fragment>
        <StyledSelect
          label="Language"
          hint={LANGUAGE_HINT}
          onChange={(language) => onChange({ language })}
          value={language}
          options={STAGE_LANGUAGE_OPTIONS} />

        <StyledSelect
          label="Language Version"
          hint={LANGUAGE_VERSION_HINT}
          onChange={(languageVersion) => onChange({ languageVersion })}
          value={languageVersion}
          options={languageVersionOptions} />

        <StyledInput
          label="Fork Mainnet Block"
          type="number"
          field="forkBlockNumber"
          value={forkBlockNumber}
          hint={FORK_MAINNET_BLOCK_HINT}
          onChange={({ target: { value }}) => onChange({ forkBlockNumber: +value })} />

        <StyledSelect
          label="Test Framework"
          hint={TEST_FRAMEWORK_HINT}
          onChange={(testFramework) => onChange({ testFramework })}
          value={testFramework}
          options={frameworkOptions} />
      </React.Fragment>
    )
  }
}

export default CodeStageConfig;
