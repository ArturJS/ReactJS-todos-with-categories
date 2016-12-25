import React, {PropTypes, Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.onAddTodoClick = this.onAddTodoClick.bind(this);
  }

  onAddTodoClick() {
    const titleElement = this.refs.title.getInputNode();
    const descriptionElement = this.refs.description.getInputNode();

    this.props.addTodo({
      id: Math.random(),
      title: titleElement.value,
      description: descriptionElement.value
    });

    titleElement.value = "";
    descriptionElement.value = "";

    titleElement.focus();
  }

  componentDidMount() {
    this.refs.title.getInputNode().focus();
  }

  render() {
    return (
      <form>
        <TextField
          ref="title"
          hintText="Enter todo title here..."
          floatingLabelText="Todo title"
          fullWidth={true}
        />
        <br/>
        <TextField
          ref="description"
          hintText="Enter todo description here..."
          floatingLabelText="Todo description"
          fullWidth={true}
          multiLine={true}
        />
        <RaisedButton
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
