import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import * as todoActions from '../../common/orm/actions/todo.actions';
import {todoIdsListByCategoryId} from '../../common/orm/selectors/todo.selectors';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './TodoListPage.scss';


function mapStateToProps(state, props) {
  const {categoryId} = props.match.params;
  return {
    todoIdsList: todoIdsListByCategoryId(categoryId)(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActions, dispatch)
  };
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class TodoListPage extends PureComponent {
  static propTypes = {
    todoIdsList: PropTypes.arrayOf(PropTypes.string).isRequired,
    todoActions: PropTypes.object.isRequired
  };

  static contextTypes = {
    showCategories: PropTypes.func.isRequired
  };

  onAddTodo = (todo) => {
    const {categoryId} = this.props.match.params;
    this.props.todoActions.addTodo(todo, categoryId);
  };

  showCategories = (event) => {
    event.preventDefault();
    this.context.showCategories();
  };

  render() {
    const {todoIdsList} = this.props;

    return (
      <div className="todo-list-page">
        <a className="back-to-categories hide-from-tablet" onClick={this.showCategories}>
          <i className="glyphicon glyphicon-chevron-left"/>
          Back to categories list
        </a>
        <TodoForm addTodo={this.onAddTodo}/>
        <div className="todo-list">
          {todoIdsList.length > 0
              ? todoIdsList.map((todoId) =>
                <TodoItem
                  key={todoId}
                  todoId={todoId}
                />
              )
              : <h3>Nothing to display...</h3>
          }
        </div>
      </div>
    );
  }
}
