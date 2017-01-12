import React, {PropTypes, Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './TodoForm.scss';

class TodoForm extends Component {
  _title;

  constructor(props) {
    super(props);

    this.onAddTodo = this.onAddTodo.bind(this);
    this.focusTitleInput = this.focusTitleInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onAddTodo(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.addTodo({
      title: this._title.value,
      description: ''
    });

    this.resetForm();

    this.focusTitleInput();
  }

  resetForm() {
    this._title.value = '';
  }

  focusTitleInput() {
    this._title.focus();
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.onAddTodo}>
        <input type="text"
               className="todo-title-field"
               placeholder="Enter todo title here..."
               ref={(node) => this._title = node}
        />
        <RaisedButton
          type="submit"
          label="Add"
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoForm;
