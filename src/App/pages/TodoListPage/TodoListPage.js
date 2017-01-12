import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../actions/todo-actions';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './TodoListPage.scss';
import LinearProgress from 'material-ui/LinearProgress';

import {store} from '../../store/store';
import {ActionCreators} from 'redux-undo';
import {updateTodoFilter} from '../../actions/todo-filter-actions';

import TodoFilter from '../../components/TodoFilter/TodoFilter';
import CategoryContainer from '../../components/Categories/CategoryContainer';

class TodoListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: props.params.categoryId,
      todoList: []
    };

    const {searchQuery, showDone} = props.params;

    store.dispatch(
      updateTodoFilter({
        searchQuery,
        showDone
      })
    );

    this.onAddTodo = this.onAddTodo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {categoryId, searchQuery, showDone} = nextProps.params;
    let {todoFilterState} = store.getState();
    todoFilterState = todoFilterState.present;

    this.setState({
      categoryId: categoryId
    });

    console.dir(store.getState());

    if (searchQuery !== todoFilterState.searchQuery || showDone !== todoFilterState.showDone) {
      store.dispatch(
        updateTodoFilter({
          searchQuery,
          showDone
        })
      );
    }
  }

  undo() {
    store.dispatch(ActionCreators.undo());
  }

  redo() {
    store.dispatch(ActionCreators.redo());
  }

  onAddTodo(todo) {
    this.props.actions.addTodo(todo, this.state.categoryId);
  }

  render() {
    let {categoryId} = this.state;
    console.dir(this.props.params);

    return (
      <div className="App-body todo-list-page-modifier">
        <div className="layout-header">
          <div className="layout-subheading">
            <h2 className="page-name">To-do list</h2>
            <TodoFilter />
          </div>
          <div className="progress-bar-cnt">
            <LinearProgress className="progress-bar" mode="determinate" value={this.state.completed} />
          </div>
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
