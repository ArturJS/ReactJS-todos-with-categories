import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import * as todoActions from '../../../../common/orm/actions/todo.actions';
import {todoById} from '../../../../common/orm/selectors/todo.selectors';
import Checkbox from '../../../../common/components/Checkbox';
import './TodoItem.scss';


function mapStateToProps(state, props) {
  return {
    todo: todoById(props.todoId)(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActions, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoItem extends PureComponent {
  static propTypes = {
    todoId: PropTypes.string.isRequired,
    todo: PropTypes.object.isRequired
  };

  removeTodo = () => {
    this.props.todoActions.removeTodo(this.props.todoId);
  };

  updateTodo = (value) => {
    this.props.todoActions.updateTodo({...this.props.todo, isDone: value});
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
          <Link to={`/category/${todo.categoryId}/todo/${todo.id}`}
                className="todo-title-link">
            {todo.title}
          </Link>
        </h3>
        <Checkbox value={todo.isDone} onChange={this.updateTodo}/>
      </div>
    );
  }
}
