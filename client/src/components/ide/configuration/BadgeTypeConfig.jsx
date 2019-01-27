import React, { Component } from 'react';
import StyledInput from '../../forms/StyledInput';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
import destroyBadge from '../../../mutations/badgeType/destroy';
import SVG from '../../SVG';
import './BadgeTypeConfig.scss';

const NAME_HINT = 'Short name displayed to the user';
const DESCRIPTION_HINT = 'Description of this Contents purpose';
const BADGE_LIMIT_HINT = 'The number of badges given out before it runs out (keep at 0 for infinite)';
const THUMBNAIL_HINT = 'You give us a web URL of an image, we\'ll show it the user';

const toArgs = (v) => v.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const toMapping = (v) => v.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const toReturns = (v) => v.map(([prop]) => `${prop}`).join('\n    ');

const variables = [
  ['id', 'String'],
  ['name', 'String'],
  ['badgeLimit', 'Int'],
  ['description', 'String'],
  ['thumbnailUrl', 'String'],
];

const mutation = `
mutation modifyBadgeType(${toArgs(variables)}) {
  modifyBadgeType(${toMapping(variables)}) {
    ${toReturns(variables)}
  }
}
`

const validators = {
  name: x => !!x,
  badgeLimit: x => x >= 0,
}

const validate = (props, validators) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class BadgeConfig extends Component {
  constructor(props) {
    super(props);
    props.onValidate(({ badgeType }) => {
      return validate(badgeType, validators);
    });
    props.onSave(({ badgeType }) => {
      return apiMutation(mutation, badgeType);
    });
  }
  destroyBadge = async () => {
    confirm("Are you sure you want to delete this badge?").then(() => {
      const { id } = this.props.badgeType;
      apiMutation(destroyBadge, { id });
    });
  }
  render() {
    const { update, saveState: { errors },
      badgeType: {
        description, name, thumbnailUrl, badgeLimit
      } } = this.props;
    const updateBadgeType = (state) => update({ badgeType: state })
    return (
      <div className="container-config">
        <form className="config">
          <StyledInput
            hint={NAME_HINT}
            label="Name"
            type="text"
            value={name}
            errors={errors}
            field="name"
            onChange={({ target: { value }}) => updateBadgeType({ name: value })} />

          <StyledInput
            hint={DESCRIPTION_HINT}
            label="Description"
            type="text"
            value={description}
            errors={errors}
            field="description"
            onChange={({ target: { value }}) => updateBadgeType({ description: value })} />

          <StyledInput
            hint={BADGE_LIMIT_HINT}
            label="Badge Limit"
            type="number"
            value={badgeLimit}
            errors={errors}
            field="badgeLimit"
            onChange={({ target: { value }}) => updateBadgeType({ badgeLimit: +value })} />

          <StyledInput
            hint={THUMBNAIL_HINT}
            label="Thumbnail URL"
            type="text"
            value={thumbnailUrl}
            errors={errors}
            field="thumbnailUrl"
            onChange={({ target: { value }}) => updateBadgeType({ thumbnailUrl: value })} />

          <div className="btn btn-primary" onClick={this.destroyBadge}>
            <SVG name="trash" />
            Destroy Badge
          </div>
        </form>
      </div>
    )
  }
}

export default BadgeConfig;
