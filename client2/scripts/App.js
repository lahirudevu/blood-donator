import React, { PropTypes } from 'react';
import Explore from './components/Explore';

export default class App {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
        <div className='App'>
          <Explore {...this.props} />
          <hr />
          {this.props.children}
        </div>
    );
  }
}
