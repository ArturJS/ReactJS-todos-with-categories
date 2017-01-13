import React, {PropTypes, Component} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../../actions/category-actions';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './CategoryContainer.scss';
import * as _ from 'lodash';

import {push} from 'react-router-redux';
import {store} from '../../store/store';
import {getAllChildCategoryIds, findRelatedCategory} from '../../helpers/category.helpers';

class CategoryContainer extends Component {
  _categoryForRemoving;

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.addCategory = this.addCategory.bind(this);
    this.addSubcategory = this.addSubcategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.onDeleteCategory = this.onDeleteCategory.bind(this);//should open confirm modal before delete action
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    let {categoryList, currentCategoryId, isAttachMode, attachByCategoryId} = this.props;
    categoryList = categoryList.present;

    return (
      <div className="category-container">
        <CategoryForm addCategory={this.addCategory}/>
        <CategoryList categoryList={categoryList}
                      currentCategoryId={currentCategoryId}
                      addSubcategory={this.addSubcategory}
                      deleteCategory={this.onDeleteCategory}
                      isAttachMode={isAttachMode}
                      attachByCategoryId={attachByCategoryId}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          className="confirm-modal"
          contentLabel={''}>
          <h3>Please, confirm your action</h3>
          <p>
            {
              `Are you sure that you want to remove ${this._categoryForRemoving && this._categoryForRemoving.name} ?`
            }
          </p>
          <div className="modal-buttons-group">
            <FlatButton type="button"
                        label="Remove"
                        className="btn-modal"
                        onClick={()=> {
                          this.deleteCategory(this._categoryForRemoving.id)
                        }}/>
            <RaisedButton type="button"
                          label="Cancel"
                          className="btn-modal"
                          onClick={this.closeModal}/>
          </div>
        </Modal>
      </div>
    );
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  addCategory(newCategory) {
    this.props.actions.addCategory(newCategory);
  }

  addSubcategory(relatedCategoryId) {
    this.props.actions.addSubCategory(relatedCategoryId);
  }

  onDeleteCategory(categoryId) {
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    this._categoryForRemoving = findRelatedCategory(categoryList, categoryId);

    this.openModal();
  }

  deleteCategory(categoryId) {
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    let relatedCategory = findRelatedCategory(categoryList, categoryId);

    if (relatedCategory) {
      let allRelatedCategoryIds = [relatedCategory.id, ...getAllChildCategoryIds(relatedCategory)];

      if (_.includes(allRelatedCategoryIds, this.props.currentCategoryId)) {
        store.dispatch(push('/'));
      }

      const {removeCategoryTodos, removeCategory} = this.props.actions;
      removeCategoryTodos(relatedCategory);
      removeCategory(relatedCategory);
    }

    this.closeModal();
  }
}

CategoryContainer.propTypes = {
  categoryList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    categoryList: state.categoryList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);

