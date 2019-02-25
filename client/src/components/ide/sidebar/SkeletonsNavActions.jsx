import * as dialog from 'utils/dialog';
import AddSkeleton from './dialogs/skeleton/AddSkeleton';
import React, { Component } from 'react';
import SVG from 'components/SVG';

class SkeletonsNavActions extends Component {
  render() {
    const { stage } = this.props;
    const { type } = stage;
    if(type === 'DownloadStage') {
      return (
        <li>
          <div className="action" onClick={() => dialog.open(AddSkeleton, { stage })}>
            <SVG name="skeleton"/>
            <span>add skeleton…</span>
          </div>
        </li>
      )
    }
    return null;
  }
}

export default SkeletonsNavActions;
