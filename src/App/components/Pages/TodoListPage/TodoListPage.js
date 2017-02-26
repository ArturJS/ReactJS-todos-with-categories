import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../../actions/todo-actions';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm/TodoForm';
import './TodoListPage.scss';

import {store} from '../../../store/store';
import {updateTodoFilter} from '../../../actions/todo-filter-actions';
import {updatePageTitle} from '../../../actions/page-title-actions';

import _ from 'lodash';

import getTodoList from '../../../selectors/todo-list.selector';


function mapStateToProps(state, props) {
  return {
    todoList: getTodoList(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoListPage extends Component {
  static propTypes = {
    todoList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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

    this.setPageTitle();
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

    this.setPageTitle();
  }

  setPageTitle() {
    store.dispatch(
      updatePageTitle('To-do list')
    );
  }

  onAddTodo = (todo) => {
    this.props.actions.addTodo(todo, this.state.categoryId);
  };

  render() {
    const {removeTodo, updateTodo} = this.props.actions;
    let {todoList} = this.props;

    return (
      <div className="todo-list-page">
        <TodoForm addTodo={this.onAddTodo}/>
        <TodoList todoList={todoList} removeTodo={removeTodo} updateTodo={updateTodo}/>
      </div>
    );
  }
}
