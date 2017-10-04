import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../../actions/todo-actions';
import TodoForm from './TodoForm/TodoForm';
import Todo from './Todo/Todo';
import './TodoListPage.scss';

import {store} from '../../../store/store';
import {updateTodoFilter} from '../../../actions/todo-filter-actions';

import _ from 'lodash';

import getTodoList from '../../../selectors/todo-list.selector';


function mapStateToProps(state, props) {
  return {
    todoList: getTodoList(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActions, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoListPage extends PureComponent {
  static propTypes = {
    todoList: PropTypes.array.isRequired,
    todoActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      categoryId: props.params.categoryId,
      todoList: []
    };
  }

  componentDidMount() {
    let {searchQuery, showDone} = this.props.params;

    if (searchQuery || showDone) {
      showDone = showDone && JSON.parse(showDone);

      store.dispatch(
        updateTodoFilter({
          searchQuery,
          showDone
        })
      );
    }

  }

  componentWillReceiveProps(nextProps) {//todo: split to smart (with Business logic) and dumb component (only for render)
    if (_.isEqual(this.props.params, nextProps.params)) return;

    let {categoryId, searchQuery, showDone} = nextProps.params;
    let {todoFilterState} = store.getState();
    todoFilterState = todoFilterState.present;

    this.setState({
      categoryId: categoryId
    });

    showDone = showDone && JSON.parse(showDone);

    if (searchQuery !== todoFilterState.searchQuery || showDone !== todoFilterState.showDone) {
      store.dispatch(
        updateTodoFilter({
          searchQuery,
          showDone
        })
      );
    }
  }

  onAddTodo = (todo) => {
    this.props.todoActions.addTodo(todo, this.state.categoryId);
  };

  render() {
    const {removeTodo, updateTodo} = this.props.todoActions;
    let {todoList} = this.props;

    return (
      <div className="todo-list-page">
        <TodoForm addTodo={this.onAddTodo}/>
        <div className="todo-list">
          {
            todoList.length > 0
              ? todoList.map((todo) =>
                <Todo key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />)
              : <h3>Nothing to display...</h3>
          }
        </div>
      </div>
    );
  }
}
