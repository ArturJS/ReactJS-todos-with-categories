import React, {PropTypes, Component} from 'react';
import Todo from '../Todo/Todo';
import './TodoList.scss';

export default class TodoList extends Component {
  static propTypes = {
    todoList: PropTypes.array.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  };

  render() {
    const {todoList, removeTodo, updateTodo} = this.props;
    return (
      <div className="todo-list">
        {
          todoList.length > 0
            ? todoList.map((todo) =>
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />)
            : <h3>Nothing to display...</h3>
        }
      </div>
    );
  }
}
