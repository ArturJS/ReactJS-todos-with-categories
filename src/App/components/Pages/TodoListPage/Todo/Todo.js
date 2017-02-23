import React, {PropTypes} from 'react';
import './Todo.scss';
import Checkbox from '../../../Common/Checkbox/Checkbox';
import { Link } from 'react-router';

const Todo = ({todo, removeTodo, updateTodo}) => {
  return (
    <div className="todo-card">
      <i className="todo-remove"
         onClick={() => removeTodo(todo)}>&times;</i>
      <h3 className="todo-title">
        <Link to={`category/${todo.categoryId}/todo/${todo.id}`}
              className="todo-title-link">{todo.title}</Link>
      </h3>
      <Checkbox value={todo.isDone} onChange={(value)=>{
        updateTodo(todo, {isDone: value});
      }} />
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default Todo;
