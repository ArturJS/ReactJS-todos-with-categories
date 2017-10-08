import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import 'babel-polyfill';

import history from './common/history';
import store from './common/store';
import RootShell from './common/shells/RootShell';
import TodoEditPage from './pages/TodoEditPage';
import TodoListPage from './pages/TodoListPage';
import './index.scss';

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootShell>
        <Switch>
          <Route exact path={'/category/:categoryId?'} component={TodoListPage}/>
          <Route exact path={'/category/:categoryId/todo/:todoId'} component={TodoEditPage}/>
          <Redirect from={'/*'} to="/"/>
        </Switch>
      </RootShell>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
