import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../actions/todo-actions';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './TodoListPage.scss';

import {store} from '../../store/store';
import {updateTodoFilter} from '../../actions/todo-filter-actions';

import TodoFilter from '../../components/TodoFilter/TodoFilter';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CategoryContainer from '../../components/Categories/CategoryContainer';

import * as _ from 'lodash';

class TodoListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: props.params.categoryId,
      todoList: []
    };

    let {searchQuery, showDone} = props.params;

    if (searchQuery || showDone) {
      showDone = showDone && JSON.parse(showDone);

      store.dispatch(
        updateTodoFilter({
          searchQuery,
          showDone
        })
      );
    }

    this.onAddTodo = this.onAddTodo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

  onAddTodo(todo) {
    this.props.actions.addTodo(todo, this.state.categoryId);
  }

  render() {
    let {categoryId} = this.state;

    return (
      <div className="App-body todo-list-page-modifier">
        <div className="layout-header">
          <div className="layout-subheading">
            <h2 className="page-name">To-do list</h2>
            <TodoFilter />
          </div>
          <ProgressBar />
        </div>
        <div className="layout-body">
          <div className="layout-left-pane">
            <CategoryContainer currentCategoryId={this.props.params.categoryId} />
          </div>
          <div className="layout-right-pane">
            {categoryId ? this.renderTodoListPage() : ''}
          </div>
        </div>

      </div>
    );
  }

  renderTodoListPage() {
    const {removeTodo, updateTodo} = this.props.actions;
    const {categoryId} = this.state;
    let {todoList, todoFilterState} = this.props;

    todoList = todoList.present;
    todoFilterState = todoFilterState.present;

    let {showDone, searchQuery} = todoFilterState;

    todoList = todoList.filter((todo)=> todo.categoryId === categoryId);

    if (showDone) {
      todoList = todoList.filter((todo)=> todo.isDone);
    }

    if (searchQuery && searchQuery.trim()) {
      searchQuery = searchQuery.toLowerCase();

      todoList = todoList.filter((todo)=> {
        return todo.title.toLowerCase().indexOf(searchQuery) > -1 ||
          todo.description.toLowerCase().indexOf(searchQuery) > -1;
      });
    }

    return (
      <div className="todo-list-page">
        <TodoForm addTodo={this.onAddTodo}/>
        <TodoList todoList={todoList} removeTodo={removeTodo} updateTodo={updateTodo}/>
      </div>
    );
  }
}

TodoListPage.propTypes = {
  todoFilterState: PropTypes.object.isRequired,
  todoList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    todoList: state.todoList,
    todoFilterState: state.todoFilterState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPage);
