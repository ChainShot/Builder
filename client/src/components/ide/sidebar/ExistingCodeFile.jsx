import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledSelect from '../../forms/StyledSelect';
import './ExistingCodeFile.scss';

const mutation = `
mutation modifyCodeFile($codeFileId: String, $codeStageIds: [String], $stageId: String, $codeFileIds: [String]) {
  modifyCodeFile(id: $codeFileId, codeStageIds: $codeStageIds) {
    id
    codeStageIds
  }
  modifyStage(id: $stageId, codeFileIds: $codeFileIds) {
    id
    codeFileIds
  }
}
`

const validators = {
  codeFile: (x) => !!x,
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class ExistingCodeFile extends Component {
  constructor(props) {
    super(props);
    const { stage, stageContainer: { stages } } = props;
    const uniqueCodeFiles = stages.reduce((codeFiles, curStage) => {
      curStage.codeFiles.forEach(cf => {
        const alreadyAccumulated = !!codeFiles.find(x => x.id === cf.id);
        const alreadyInStage = !!stage.codeFiles.find(x => x.id === cf.id)
        if(!alreadyAccumulated && !alreadyInStage) {
          codeFiles.push(cf);
        }
      });
      return codeFiles;
    }, []).sort((a,b) => a.name.localeCompare(b.name));
    const options = uniqueCodeFiles.map((codeFile) => ({
      label: codeFile.name,
      value: codeFile
    }))
    this.state = {
      codeFile: null,
      errors: [],
      options,
    }
  }
  onSubmit = (evt) => {
    evt && evt.preventDefault();
    const { codeFile, errors } = this.state;
    if(errors.length > 0) return;

    const { stage } = this.props;
    const { codeFileIds } = stage;
    const { codeStageIds, id } = codeFile;
    const variables = {
      codeFileId: id,
      codeStageIds: codeStageIds.concat(stage.id),
      stageId: stage.id,
      codeFileIds: (codeFileIds || []).concat(id),
    };
    apiMutation(mutation, variables).then(({ modifyCodeFile: { id }}) => {
      close(id);
    });
  }
  validate() {
    const { codeFile } = this.state;
    const errors = validate({ codeFile });
    this.setState({ errors });
  }
  componentDidMount() {
    this.validate();
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value }, this.validate);
  }
  render() {
    const { codeFile, options, errors } = this.state;
    return (
      <form className="existing-code-file" onSubmit={this.onSubmit}>
        <StyledSelect
          label="Existing Code File"
          onChange={(val) => this.handleChange("codeFile", val)}
          value={codeFile}
          options={options} />

        <Actions
          onSubmit={this.onSubmit}
          errors={errors} />
      </form>
    )
  }
}

class Actions extends Component {
  render() {
    const { onSubmit, errors } = this.props;
    const submitClasses = ['btn btn-primary'];
    if(errors.length > 0) {
      submitClasses.push('disabled')
    }
    return (
      <div className="actions">
        <div className={submitClasses.join(' ')} onClick={onSubmit}>
          Add Existing Code File
        </div>
      </div>
    )
  }
}

export default ExistingCodeFile;
