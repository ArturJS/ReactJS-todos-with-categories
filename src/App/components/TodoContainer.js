import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../actions/todo-actions';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './TodoContainer.scss';
import RaisedButton from 'material-ui/RaisedButton';

import {store} from './../../index';
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
    let {todoList} = this.props;
    const {addTodo, removeTodo} = this.props.actions;

    todoList = todoList.present;
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
        <TodoList todoList={todoList} removeTodo={removeTodo}/>
      </div>
    );
  }
}

TodoContainer.propTypes = {
  todoList: PropTypes.object.isRequired,
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
