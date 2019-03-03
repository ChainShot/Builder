import React, { Component } from 'react';
import { close } from 'utils/contextMenu';

class TabContextMenu extends Component {
  closeOtherTabs = () => {
    this.props.closeOtherTabs();
    close();
  }
  closeTabsToTheRight = () => {
    this.props.closeTabsToTheRight();
    close();
  }
  render() {
    return (
      <div className="tab-context-menu options">
        <div onClick={this.closeOtherTabs}> Close Other Tabs </div>
        <div onClick={this.closeTabsToTheRight}> Close Tabs to the Right </div>
      </div>
    )
  }
}

export default TabContextMenu;
