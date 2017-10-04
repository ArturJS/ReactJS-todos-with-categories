import React, { PropTypes, PureComponent } from "react";
import { hashHistory } from "react-router";
import _ from "lodash";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as categoryActions from "./Categories.ducks";
import * as currentTodoActions from "../../../actions/current-todo-actions";

import CategoryForm from "./CategoryForm/CategoryForm";
import CategoryItem from "./CategoryItem/CategoryItem";

import "./Categories.scss";

import { push } from "react-router-redux";
import { store } from "../../../store/store";
import {
  getAllChildCategoryIds,
  findRelatedCategory
} from "../../../helpers/category.helpers";

function mapStateToProps(state, props) {
  return {
    categoryList: state.categoryList.present
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch),
    currentTodoActions: bindActionCreators(currentTodoActions, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Categories extends PureComponent {
  static propTypes = {
    categoryList: PropTypes.array.isRequired,
    categoryActions: PropTypes.object.isRequired,
    isAttachMode: PropTypes.bool.isRequired
  };

  state = {
    //todo move modal to App
    modalIsOpen: false
  };
  _categoryForRemoving;

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  addCategory = newCategory => {
    this.props.categoryActions.addCategory(newCategory);
  };

  addSubcategory = relatedCategoryId => {
    this.props.categoryActions.addSubCategory(relatedCategoryId);
  };

  onDeleteCategory = categoryId => {
    let { categoryList } = this.props;
    this._categoryForRemoving = findRelatedCategory(categoryList, categoryId);
    this.openModal();
  };

  deleteCategory = () => {
    let categoryId = this._categoryForRemoving.id;
    let { categoryList } = this.props;
    let relatedCategory = findRelatedCategory(categoryList, categoryId); //todo: move to removeCategory()

    if (relatedCategory) {
      let allRelatedCategoryIds = [
        relatedCategory.id,
        ...getAllChildCategoryIds(relatedCategory)
      ];

      if (_.includes(allRelatedCategoryIds, this.props.currentCategoryId)) {
        store.dispatch(push("/"));
      }

      const {
        removeCategoryTodos,
        removeCategory
      } = this.props.categoryActions;
      removeCategoryTodos(relatedCategory);
      removeCategory(relatedCategory);
    }

    this.closeModal();
  };

  attachByCategoryId = categoryId => {
    const location = hashHistory.getCurrentLocation();
    hashHistory.replace(
      location.pathname.replace(
        /category\/(.+)\/todo\/(.+)/,
        (match, p1, p2) => `category/${categoryId}/todo/${p2}`
      )
    );

    this.props.currentTodoActions.updateCurrentTodo({ categoryId });
  };

  render() {
    let { categoryList, isAttachMode } = this.props;

    return (
      <div className="category-container">
        <CategoryForm addCategory={this.addCategory} />
        <div className="category-list">
          {categoryList.map(category => (
            <CategoryItem
              key={category.id}
              isAttachMode={isAttachMode}
              attachByCategoryId={this.attachByCategoryId}
              category={category}
              addSubcategory={this.addSubcategory}
              deleteCategory={this.onDeleteCategory}
            />
          ))}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          className="confirm-modal"
          contentLabel={""}
        >
          <h3>Please, confirm your action</h3>
          <p>
            {`Are you sure that you want to remove ${this
              ._categoryForRemoving && this._categoryForRemoving.name} ?`}
          </p>
          <div className="modal-buttons-group">
            <button
              type="button"
              className="btn btn-default btn-modal"
              onClick={this.deleteCategory}
            >
              Remove
            </button>
            <button
              type="button"
              className="btn btn-primary btn-modal"
              onClick={this.closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
