import React, {PropTypes, Component} from 'react';
import './Todo.scss';
import Checkbox from '../../../Common/Checkbox/Checkbox';
import {Link} from 'react-router';

export default class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  };

  removeTodo = () => {
    const {
      todo,
      removeTodo
    } = this.props;

    removeTodo(todo);
  };

  updateTodo = (value) => {
    const {
      todo,
      updateTodo
    } = this.props;

    updateTodo(todo, {isDone: value});
  };

  render() {
    const {
      todo
    } = this.props;

    return (
      <div className="todo-card">
        <i className="todo-remove"
           onClick={this.removeTodo}>&times;</i>
        <h3 className="todo-title">
          <Link to={`category/${todo.categoryId}/todo/${todo.id}`}
                className="todo-title-link">{todo.title}</Link>
        </h3>
        <Checkbox value={todo.isDone} onChange={this.updateTodo}/>
      </div>
    );
  }
}
