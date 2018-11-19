import React, { Component } from 'react';
import Header from './Header';
import './SelectLayout.scss';

class SelectLayout extends Component {
    render() {
      return (
        <React.Fragment>
          <Header/>
          <div className="selection">
            { this.props.children }
          </div>
        </React.Fragment>
      );
    }
}

export default SelectLayout;
