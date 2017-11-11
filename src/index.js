import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {Redirect, Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import 'babel-polyfill';

import {categoriesStore} from './common/mst/categories/categories.store';
import modalStore from './common/features/modals/modal.store';
// import {todosStore} from './common/mst/todos/todos.store';
import RootShell from './common/shells/RootShell';
// import TodoEditPage from './pages/TodoEditPage';
import TodoListPage from './pages/TodoListPage';
import './index.scss';

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const stores = {
  categoriesStore,
  modalStore
  // todosStore
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <RootShell>
        <Switch>
          <Route exact path={'/category/:categoryId?'} component={TodoListPage}/>
          {/* <Route exact path={'/category/:categoryId/todo/:todoId'} component={TodoEditPage}/> */}
          <Redirect from={'/*'} to="/"/>
        </Switch>
      </RootShell>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
