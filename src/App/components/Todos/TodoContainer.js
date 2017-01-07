import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../actions/todo-actions';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './TodoContainer.scss';
import RaisedButton from 'material-ui/RaisedButton';

import {store} from './../../../index';
import {ActionCreators} from 'redux-undo';

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: []
    };
  }

  undo() {
    store.dispatch(ActionCreators.undo());
  }

  redo() {
    store.dispatch(ActionCreators.redo());
  }

  render() {
    let {todoList, todoFilterState} = this.props;
    const {addTodo, removeTodo, updateTodo} = this.props.actions;

    todoList = todoList.present;
    todoFilterState = todoFilterState.present;

    let {showDone, searchQuery} = todoFilterState;

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
      <div className="todo-container">
        <RaisedButton
          className="half-width"
          label="Undo"
          onClick={()=> this.undo()}
        />
        <RaisedButton
          className="half-width"
          label="Redo"
          onClick={()=> this.redo()}
        />
        <TodoForm addTodo={addTodo}/>
        <TodoList todoList={todoList} removeTodo={removeTodo} updateTodo={updateTodo}/>
      </div>
    );
  }
}

TodoContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
