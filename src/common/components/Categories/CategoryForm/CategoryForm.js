import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as categoryActions from '../../../orm/actions/category.actions';
import './CategoryForm.scss';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addCategory: bindActionCreators(categoryActions.addCategory, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CategoryForm extends PureComponent {
  static propTypes = {
    addCategory: PropTypes.func.isRequired
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

    this.props.addCategory({name});
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
