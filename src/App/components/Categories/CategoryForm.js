import React, {PropTypes, Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './CategoryForm.scss';

class CategoryForm extends Component {
  _name;

  constructor(props) {
    super(props);

    this.onAddCategoryClick = this.onAddCategoryClick.bind(this);
    this.focusTitleInput = this.focusTitleInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onAddCategoryClick() {

    this.props.addCategory({
      id: Math.random(),
      name: this._name.value,
      parent: null,
      childs: []
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
      <form className="category-form">
        <input type="text"
               className="category-name-field"
               ref={(node) => this._name = node}
        />
        <RaisedButton
          type="button"
          label="Add"
          onClick={this.onAddCategoryClick}
        />
      </form>
    );
  }
}

CategoryForm.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default CategoryForm;
