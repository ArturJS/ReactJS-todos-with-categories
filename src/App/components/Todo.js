import React, {PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import './Todo.scss';

const style = {
  todoTitle: {
    'font-size': '24px',
    'font-weight': 'bold'
  }
};

const Todo = ({todo}) => {
  return (
    <Card className="todo-card">
      <CardHeader
        title={todo.title}
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={style.todoTitle}
      />
      <CardText expandable={true}>
        {todo.description}
      </CardText>
    </Card>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired
};

export default Todo;
