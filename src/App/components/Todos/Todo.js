import React, {PropTypes} from 'react';
import './Todo.scss';

const Todo = ({todo, removeTodo}) => {
  return (
    <div className="todo-card">
      <i className="todo-remove"
         onClick={() => removeTodo(todo)}>&times;</i>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired
};

export default Todo;
