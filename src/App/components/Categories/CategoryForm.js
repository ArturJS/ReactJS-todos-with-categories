import React, {PropTypes, Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './CategoryForm.scss';

class CategoryForm extends Component {
  _name;

  constructor(props) {
    super(props);

    this.onAddCategory = this.onAddCategory.bind(this);
    this.focusTitleInput = this.focusTitleInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onAddCategory(event) {
    event.preventDefault();
    event.stopPropagation();

    let name = this._name.value.trim();

    if (!name) return;

    this.props.addCategory({
      name: name
    });

    this.resetForm();

    this.focusTitleInput();
  }

  componentDidMount() {
    this.focusTitleInput();
  }

  resetForm() {
    this._name.value = '';
  }

  focusTitleInput() {
    this._name.focus();
  }

  render() {
    return (
      <form className="category-form" onSubmit={this.onAddCategory}>
        <input type="text"
               className="category-name-field"
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

CategoryForm.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default CategoryForm;
