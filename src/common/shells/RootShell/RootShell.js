import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import logo from '../../../logo.svg';
import UndoRedo from '../../components/UndoRedo';
import TodosFilter from '../../components/TodosFilter';
import ProgressBar from '../../components/ProgressBar';
import Categories from '../../components/Categories';
import './RootShell.scss';

function mapStateToProps(state, props) {
  return {
    editingTodoTitle: state.editingTodo.title
  };
}

@withRouter
@connect(mapStateToProps)
export default class RootShell extends PureComponent {
  isIndexPage = () => {
    return this.props.location.pathname.indexOf('todo') === -1;
  };

  render() {
    const isIndexPage = this.isIndexPage();

    return (
      <div className="root-shell">
        <div className="root-shell--header">
          <UndoRedo />
          <img src={logo} className="App-logo" alt="logo"/>
          <h2 className="App-logo-text">Welcome to React</h2>
        </div>
        <div className="root-shell--body">
          <div className="layout-header">
            <div className="layout-subheading">
              <h2 className="page-name">
                {isIndexPage ? 'To-do list' : this.props.editingTodoTitle}
              </h2>
              {
                isIndexPage && <TodosFilter />
              }
            </div>
            {
              isIndexPage && <ProgressBar />
            }
          </div>
          <div className="layout-body">
            <div className="layout-left-pane">
              <Categories />
            </div>
            <div className="layout-right-pane">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
