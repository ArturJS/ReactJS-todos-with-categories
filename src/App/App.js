import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.scss';
import RaisedButton from 'material-ui/RaisedButton';
import TodoContainer from './components/TodoContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <RaisedButton className="m15" label="Default" />
          <RaisedButton className="m15" label="Primary" primary={true} />
          <RaisedButton className="m15" label="Secondary" secondary={true} />
          <RaisedButton className="m15" label="Disabled" disabled={true} />
          <br />
          <br />
          <RaisedButton label="Full width" fullWidth={true} />
        </div>
        <TodoContainer />
      </div>
    );
  }
}

export default App;
