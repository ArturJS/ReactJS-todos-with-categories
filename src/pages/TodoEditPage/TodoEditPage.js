import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';

import * as todoActions from '../../common/orm/actions/todo.actions';
import {todoById} from '../../common/orm/selectors/todo.selectors';
import * as editingTodoActions from '../../common/ducks/editing-todo.ducks';
import Checkbox from '../../common/components/Checkbox';
import './TodoEditPage.scss';


function mapStateToProps(state, props) {
  return {
    originalTodo: todoById(props.match.params.todoId)(state),
    editingTodo: state.editingTodo,
    todosFilter: state.todosFilter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActions, dispatch),
    editingTodoActions: bindActionCreators(editingTodoActions, dispatch)
  };
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class TodoEditPage extends PureComponent {
  static propTypes = {
    originalTodo: PropTypes.object,
    editingTodo: PropTypes.object,
    todoActions: PropTypes.object.isRequired,
    editingTodoActions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      match,
      originalTodo,
      history
    } = this.props;
    const {
      categoryId
    } = match.params;

    if (!originalTodo) {
      history.replace(`/category/${categoryId}?${this.getSearchParams()}`);
      return;
    }

    this.props.editingTodoActions.updateEditingTodo(originalTodo);
  }

  getSearchParams = () => {
    let {todosFilter} = this.props;
    todosFilter = _.omitBy(todosFilter, value => !value);
    return queryString.stringify(todosFilter);
  };

  saveChanges = () => {
    const {editingTodo} = this.props;
    this.props.todoActions.updateTodo(editingTodo);
    this.goToRelatedCategoryPage(editingTodo.categoryId);
  };

  cancel = () => {
    const {categoryId} = this.props.originalTodo;
    this.goToRelatedCategoryPage(categoryId);
  };

  goToRelatedCategoryPage = (categoryId) => {
    this.props.history.push(
      `/category/${categoryId}?${this.getSearchParams()}`
    );
  };

  updateTitle = (event) => {
    const title = event.target.value;
    this.props.editingTodoActions.updateEditingTodo({title});
  };

  updateIsDone = (isDone) => {
    this.props.editingTodoActions.updateEditingTodo({isDone});
  };

  updateDescription = (event) => {
    const description = event.target.value;
    this.props.editingTodoActions.updateEditingTodo({description});
  };

  attachByCategoryId = (categoryId) => {
    const {editingTodo} = this.props;
    this.props.history.replace(`category/${categoryId}/todo/${editingTodo.id}`);
  };

  render() {
    const {editingTodo} = this.props;

    return (
      <div className="todo-edit-page">
        <div className="buttons-container clearfix">
          <div className="buttons-right">
            <button
              className="btn btn-primary button-item"
              type="button"
              onClick={this.saveChanges}>
              Save changes
            </button>
            <button
              className="btn btn-default button-item"
              type="button"
              onClick={this.cancel}>
              Cancel
            </button>
          </div>
        </div>
        <div className="todo-edit-page--body">
          <p>
            <input
              type="text"
              className="todo-title-field"
              placeholder="todo title here..."
              value={editingTodo.title}
              onInput={this.updateTitle}
            />
          </p>
          <p>
            <label className="todo-is-done">
              <Checkbox value={editingTodo.isDone} onChange={this.updateIsDone}/>
              &nbsp; Done
            </label>
          </p>
          <p className="todo-description-area-cnt">
            <textarea
              className="todo-description-area"
              placeholder="todo description here..."
              onInput={this.updateDescription}
              value={editingTodo.description}
            />
          </p>
        </div>
      </div>
    );
  }
}
