import React, { Component } from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "react-redux";

import TodoListPage from "./components/Pages/TodoListPage/TodoListPage";
import TodoEditPage from "./components/Pages/TodoEditPage/TodoEditPage";
import Shell from "./components/Shell";
import "./App.scss";

import { store } from "./store/store";

const history = syncHistoryWithStore(hashHistory, store);

const routes = (
  <Route path="/" component={Shell}>
    <IndexRoute component={null} />
    <Route path="/category/:categoryId" component={null}>
      <IndexRoute component={TodoListPage} />
      <Route path="todo/:todoId" component={TodoEditPage} />
    </Route>
  </Route>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}
