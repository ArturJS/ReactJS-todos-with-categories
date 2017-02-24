import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';

import TodoListPage from './components/Pages/TodoListPage/TodoListPage';
import TodoEditPage from './components/Pages/TodoEditPage/TodoEditPage';
import Shell from './components/Shell';
import './App.scss';

import {store} from './store/store';

const history = syncHistoryWithStore(hashHistory, store);

const routes = (
  <Route path="/" component={Shell}>
    <IndexRoute component={TodoListPage}/>
    <Route path='/category/:categoryId(/searchQuery/:searchQuery)(/showDone/:showDone)'
           component={TodoListPage}/>
    <Route path='/category/:categoryId/todo/:todoId' component={TodoEditPage}/>
  </Route>
);

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={history} routes={routes} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
