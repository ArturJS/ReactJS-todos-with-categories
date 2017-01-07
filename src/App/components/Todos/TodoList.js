import React, {PropTypes} from 'react';
import Todo from './Todo';

const TodoList = ({todoList, removeTodo, updateTodo}) => {
  return (
    <div>
      {todoList.map((todo) =>
        <Todo key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />
      )}
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default TodoList;
