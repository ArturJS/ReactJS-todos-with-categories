import React, {Component} from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import logo from '../logo.svg';
import './App.scss';


import TodoListPage from './pages/TodoListPage/TodoListPage';
import TodoEditPage from './pages/TodoEditPage/TodoEditPage';

import {store} from './store/store';

const history = syncHistoryWithStore(hashHistory, store);

class App extends Component {
  render() {
    return (
      <div className="App wh100">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2 className="App-logo-text">Welcome to React</h2>
        </div>
        <Router history={history}>
          <Route path='/' component={TodoListPage} />
          <Route path='/category/:categoryId' component={TodoListPage} />
          <Route path='/category/:categoryId/todo/:todoId' component={TodoEditPage} />
        </Router>
      </div>
    );
  }
}

export default App;
