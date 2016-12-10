import React, {PropTypes, Component} from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.onAddTodoClick = this.onAddTodoClick.bind(this);
  }

  onAddTodoClick() {
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');

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
    document.getElementById('title').focus();
  }

  render() {
    return (
      <div>
        <input id="title" type="text" placeholder="Todo title" />
        <input id="description" type="text" placeholder="Todo description" />
        <button onClick={this.onAddTodoClick}>Add Todo</button>
      </div>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoForm;
