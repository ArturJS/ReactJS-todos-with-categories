import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss';

export default class TodoForm extends PureComponent {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  _title;

  onAddTodo = event => {
    event.preventDefault();
    event.stopPropagation();

    const title = this._title.value.trim();
    if (!title) return;

    this.props.addTodo({
      title,
      description: ''
    });

    this.resetForm();

    this.focusTitleInput();
  };

  resetForm = () => {
    this._title.value = '';
  };

  focusTitleInput = () => {
    this._title.focus();
  };

  setTitleInput = node => {
    this._title = node;
  };

  render() {
    return (
      <form className="todo-form" onSubmit={this.onAddTodo}>
        <input
          type="text"
          className="todo-title-field"
          placeholder="Enter todo title here..."
          ref={this.setTitleInput}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    );
  }
}
