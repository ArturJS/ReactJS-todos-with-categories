import React, { PropTypes, PureComponent } from "react";
import "./CategoryForm.scss";

export default class CategoryForm extends PureComponent {
  static propTypes = {
    addCategory: PropTypes.func.isRequired
  };

  _name;

  componentDidMount() {
    this.focusTitleInput();
  }

  onAddCategory = event => {
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
    this._name.value = "";
  };

  focusTitleInput = () => {
    this._name.focus();
  };

  render() {
    return (
      <form className="category-form" onSubmit={this.onAddCategory}>
        <input
          type="text"
          className="category-name-field"
          placeholder="Enter category title here..."
          ref={node => (this._name = node)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    );
  }
}
