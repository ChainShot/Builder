import React, { Component } from 'react';
import { subscribe, unsubscribe } from '../../utils/api/subscription';

class Subscriber extends Component {
  state = {}
  componentDidMount() {
    const { query, modelType, id } = this.props;
    const subscriptionIdx = subscribe(query, id, modelType, (data) => {
      const model = data[modelType];
      this.setState({ [modelType]: model });
    });
    this.setState({ subscriptionIdx });
  }
  componentWillUnmount() {
    const { subscriptionIdx } = this.state;
    if(subscriptionIdx) {
      unsubscribe(subscriptionIdx);
    }
  }
  render() {
    const { modelType } = this.props;
    const model = this.state[modelType];
    if(model) {
      return React.cloneElement(this.props.children, { [modelType]: model })
    }
    return null;
  }
}

export default Subscriber;
