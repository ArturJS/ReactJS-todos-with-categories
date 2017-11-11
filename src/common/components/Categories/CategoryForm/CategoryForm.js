import React, {PropTypes, PureComponent} from 'react';
import {observer, inject} from 'mobx-react';

import './CategoryForm.scss';


@inject('categoriesStore')
@observer
export default class CategoryForm extends PureComponent {
  static propTypes = {
    categoriesStore: PropTypes.object.isRequired
  };

  _name;

  componentDidMount() {
    this.focusTitleInput();
  }

  onAddCategory = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const name = this._name.value.trim();
    if (!name) return;

    this.props.categoriesStore.addCategory({name});
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
