import React, {PropTypes, Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import shortid from 'shortid';

class TodoForm extends Component {
  _title;
  _description;

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
      id: shortid.generate(),
      title: this._title.getValue(),
      description: this._description.getValue()
    });

    this.resetForm();

    this.focusTitleInput();
  }

  componentDidMount() {
    this.focusTitleInput();
  }

  resetForm() {
    this._title.input.value = '';//necessary for single line material-ui input
    this._description.input.setValue('');//necessary for multi line material-ui input

    this._title.setState({
      hasValue: false
    });

    this._description.setState({
      hasValue: false
    });
  }

  focusTitleInput() {
    this._title.getInputNode().focus();
  }

  render() {
    return (
      <form onSubmit={this.onAddTodo}>
        <TextField
          ref={(node) => this._title = node}
          hintText="Enter todo title here..."
          floatingLabelText="Todo title"
          fullWidth={true}
        />
        <br/>
        <TextField
          ref={(node) => this._description = node}
          hintText="Enter todo description here..."
          floatingLabelText="Todo description"
          fullWidth={true}
          multiLine={true}
        />
        <RaisedButton
          type="submit"
          label="Add Todo"
          fullWidth={true}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoForm;
