import React, {PropTypes, Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './CategoryForm.scss';

export default class CategoryForm extends Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired
  };

  _name;

  constructor(props) {
    super(props);

    this.onAddCategory = this.onAddCategory.bind(this);
    this.focusTitleInput = this.focusTitleInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.focusTitleInput();
  }

  onAddCategory = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let name = this._name.value.trim();

    if (!name) return;

    this.props.addCategory({
      name: name
    });

    this.resetForm();

    this.focusTitleInput();
  };

  resetForm = () => {
    this._name.value = '';
  };

  focusTitleInput = () => {
    this._name.focus();
  };

  render() {
    return (
      <form className="category-form" onSubmit={this.onAddCategory}>
        <input type="text"
               className="category-name-field"
               placeholder="Enter category title here..."
               ref={(node) => this._name = node}
        />
        <RaisedButton
          type="submit"
          label="Add"
        />
      </form>
    );
  }
}
