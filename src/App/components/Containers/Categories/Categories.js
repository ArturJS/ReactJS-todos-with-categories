import React, {PropTypes, Component} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from './Categories.ducks';
import CategoryForm from './CategoryForm/CategoryForm';
import CategoryList from './CategoryList/CategoryList';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './Categories.scss';
import _ from 'lodash';

import {push} from 'react-router-redux';
import {store} from '../../../store/store';
import {getAllChildCategoryIds, findRelatedCategory} from '../../../helpers/category.helpers';


function mapStateToProps(state, props) {
  return {
    categoryList: state.categoryList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CategoryContainer extends Component {
  static propTypes = {
    categoryList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  _categoryForRemoving;

  constructor(props) {
    super(props);

    this.state = {//todo move modal to App
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };


  addCategory = (newCategory) => {
    this.props.actions.addCategory(newCategory);
  };

  addSubcategory = (relatedCategoryId) => {
    this.props.actions.addSubCategory(relatedCategoryId);
  };

  onDeleteCategory = (categoryId) => {
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    this._categoryForRemoving = findRelatedCategory(categoryList, categoryId);

    this.openModal();
  };

  deleteCategory = () => {
    let categoryId = this._categoryForRemoving.id;
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    let relatedCategory = findRelatedCategory(categoryList, categoryId);//todo: move to removeCategory()

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
  };

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
                        onClick={this.deleteCategory}/>
            <RaisedButton type="button"
                          label="Cancel"
                          className="btn-modal"
                          onClick={this.closeModal}/>
          </div>
        </Modal>
      </div>
    );
  }
}
