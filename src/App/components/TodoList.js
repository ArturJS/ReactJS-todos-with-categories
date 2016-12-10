import React, {PropTypes} from 'react';
import Todo from './Todo';

const TodoList = ({todoList}) => {
  return (
    <div>
      {todoList.map((todo) =>
        <Todo key={todo.id} todo={todo} />
      )}
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired
};

export default TodoList;
