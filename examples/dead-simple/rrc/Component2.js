import React, { Component } from 'react';
import { render } from 'react-dom';
import Component2 from '../src/Component2/index';

class App extends Component {
  render() {
    return (
      <div>
        <Component2 />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
