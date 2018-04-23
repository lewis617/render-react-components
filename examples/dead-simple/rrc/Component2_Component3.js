import React, { Component } from 'react';
import { render } from 'react-dom';
import Component3 from '../src/Component2/Component3/index';

class App extends Component {
  render() {
    return (
      <div>
        <Component3 />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
