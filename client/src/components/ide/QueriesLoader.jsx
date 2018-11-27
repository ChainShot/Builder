import React, { Component } from 'react';
import apiQuery from '../../utils/api/query';

class QueryLoader extends Component {
  state = {
    resolvedProps: {},
  }
  componentDidMount() {
    const { queries } = this.props;
    queries.forEach(({ query, variables = {}, prop }, i) => {
      apiQuery(query, variables).then((result) => {
        this.setState({
          resolvedProps: {
            ...this.state.resolvedProps,
            [prop]: result[prop],
          }
        })
      });
    });
  }
  render() {
    const { resolvedProps } = this.state;
    const { queries } = this.props;
    if(queries.length === Object.keys(resolvedProps).length) {
      return React.cloneElement(this.props.children, resolvedProps)
    }
    return null;
  }
}

export default QueryLoader;
