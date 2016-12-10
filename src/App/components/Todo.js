import React, {PropTypes} from 'react';

const Todo = ({todo}) => {
  return (
    <div>
      <h3>{todo.title}</h3>
      {todo.description}
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired
};

export default Todo;
