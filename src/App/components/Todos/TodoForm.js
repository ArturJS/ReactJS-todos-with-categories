import React, {PropTypes, Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class TodoForm extends Component {
  _title;
  _description;

  constructor(props) {
    super(props);

    this.onAddTodoClick = this.onAddTodoClick.bind(this);
    this.focusTitleInput = this.focusTitleInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onAddTodoClick() {

    this.props.addTodo({
      id: Math.random(),
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
      <form>
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
          type="button"
          label="Add Todo"
          fullWidth={true}
          onClick={this.onAddTodoClick}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoForm;
