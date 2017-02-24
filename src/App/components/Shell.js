import React, {Component} from 'react';
import UndoRedo from './../components/Common/UndoRedo/UndoRedo.js';
import logo from '../../logo.svg';

export default class Shell extends Component {
  render() {
    return (
      <div className="App wh100">
        <div className="App-header">
          <UndoRedo />
          <img src={logo} className="App-logo" alt="logo"/>
          <h2 className="App-logo-text">Welcome to React</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}
