import React, { Component } from 'react';
import Dialog from '../../Dialog';
import PaneSwitch from '../../forms/PaneSwitch';
import StyledInput from '../../forms/StyledInput';
import './AddStage.scss';
import NewStageTemplate from './NewStageTemplate';
import NewStage from './NewStage';

const validators = {
  title: (x) => !!x,
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class AddStage extends Component {
  state = {
    title: "",
    errors: [],
  }
  validate() {
    const { title } = this.state;
    const errors = validate({ title });
    this.setState({ errors });
  }
  componentDidMount() {
    this.validate();
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value }, this.validate);
  }
  render() {
    const { title, errors } = this.state;
    const { containerId, position } = this.props;
    return (
      <Dialog title="New Stage" className="add-stage">
        <form>
          <div className="shared">
            <StyledInput
              label="Title"
              type="text"
              value={title}
              errors={errors}
              field="title"
              onChange={({ target }) => this.handleChange('title', target.value)}/>
          </div>

          <PaneSwitch
            labels={['From Template', 'Blank Stage']}>
            <NewStageTemplate
              title={title}
              errors={errors}
              containerId={containerId}
              position={position}/>
            <NewStage
              title={title}
              errors={errors}
              containerId={containerId}
              position={position}/>
          </PaneSwitch>
        </form>
      </Dialog>
    );
  }
}

export default AddStage;
