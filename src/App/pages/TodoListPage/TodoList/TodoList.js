import React, {PropTypes} from 'react';
import Todo from '../Todo/Todo';
import './TodoList.scss';

const TodoList = ({todoList, removeTodo, updateTodo}) => {
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
};

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default TodoList;
