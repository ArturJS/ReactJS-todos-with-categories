import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.scss';
import TodoContainer from './components/Todos/TodoContainer';
import CategoryContainer from './components/Categories/CategoryContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2 className="App-logo-text">Welcome to React</h2>
        </div>
        <div className="App-body">
          <CategoryContainer />
          <TodoContainer />
        </div>
      </div>
    );
  }
}


export default App;
