import React, { Component } from 'react';
import { render } from 'react-dom';
import Component1 from '../src/Component1';

class App extends Component {
  render() {
    return (
      <div>
        <Component1 />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
