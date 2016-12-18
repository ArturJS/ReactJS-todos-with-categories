import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../actions/todo-actions';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './TodoContainer.scss';

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: []
    };
  }

  render() {
    const {todoList} = this.props;
    const {addTodo, removeTodo} = this.props.actions;

    return (
      <div className="todo-container">
        <TodoForm addTodo={addTodo} />
        <TodoList todoList={todoList} removeTodo={removeTodo} />
      </div>
    );
  }
}

TodoContainer.propTypes = {
  todoList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    todoList: state.todoList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
