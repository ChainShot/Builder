import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import apiMutation from '../../utils/api/mutation';
import './Validations.scss';

const mutation =  `
mutation modifyStage($id: String, $abiValidations: String) {
  modifyStage(id: $id, abiValidations: $abiValidations) {
    id
    abiValidations
  }
}
`

class Validations extends Component {
  constructor(props) {
    super(props);
    props.onSave(({ stage: {id, abiValidations} }) => apiMutation(mutation, { id, abiValidations }));
  }
  render() {
    const { update, stage: { abiValidations } } = this.props;
    const updateStage = (state) => update({ stage: state })
    return (
      <div className="validations">
        <CodeEditor mode="json" code={abiValidations} onUpdate={(abiValidations) => updateStage({ abiValidations })} />
      </div>
    )
  }
}

export default Validations;
