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
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    return (
      <div className="category-container">
        <CategoryForm addCategory={this.addCategory}/>
        <CategoryList categoryList={categoryList}
                      addSubcategory={this.addSubcategory}
                      deleteCategory={this.onDeleteCategory}/>
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
    newCategory = Object.assign({parentId: null}, newCategory);

    let {categoryList} = this.props;
    categoryList = categoryList.present;

    const {updateCategoryList} = this.props.actions;

    updateCategoryList([newCategory, ...categoryList]);
  }

  addSubcategory(categoryId) {
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    let relatedCategory = this.findRelatedCategory(categoryList, categoryId);

    if (relatedCategory) {
      relatedCategory.childs.push({
        id: Math.random(),
        name: relatedCategory.name + '-' + relatedCategory.childs.length,
        parentId: relatedCategory.id,
        childs: []
      });

      const {updateCategoryList} = this.props.actions;
      updateCategoryList(categoryList);
    }
  }

  onDeleteCategory(categoryId) {
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    this._categoryForRemoving = this.findRelatedCategory(categoryList, categoryId);

    this.openModal();
  }

  deleteCategory(categoryId) {
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    let relatedCategory = this.findRelatedCategory(categoryList, categoryId);

    if (relatedCategory) {
      const {parentId} = relatedCategory;

      let parent = this.findRelatedCategory(categoryList, parentId);

      _.remove(parent ? parent.childs : categoryList, (o)=>o.id === categoryId);

      const {updateCategoryList} = this.props.actions;
      updateCategoryList(categoryList);
    }

    this.closeModal();
  }

  findRelatedCategory(categoryList, categoryId) {
    let relatedCategory = _.find(categoryList, (o)=> o.id === categoryId);

    if (relatedCategory) {
      return relatedCategory;
    }

    let hasChildsList = _.filter(categoryList, (o)=>o.childs.length > 0);

    if (hasChildsList.length > 0) {
      for (let category of hasChildsList) {
        relatedCategory = this.findRelatedCategory(category.childs, categoryId);

        if (relatedCategory) {
          return relatedCategory;
        }
      }
    } else {
      return null;
    }

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

