import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../../actions/category-actions';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import './CategoryContainer.scss';
import * as _ from 'lodash';

class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    this.addCategory = this.addCategory.bind(this);
    this.addSubcategory = this.addSubcategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  render() {
    let {categoryList} = this.props;
    categoryList = categoryList.present;

    return (
      <div className="category-container">
        <CategoryForm addCategory={this.addCategory}/>
        <CategoryList categoryList={categoryList}
                      addSubcategory={this.addSubcategory}
                      deleteCategory={this.deleteCategory}/>
      </div>
    );
  }

  addCategory(newCategory) {
    newCategory = Object.assign({parentId: null}, newCategory);

    let {categoryList} = this.props;
    categoryList = categoryList.present;

    const {updateCategoryList} = this.props.actions;

    updateCategoryList([...categoryList, newCategory]);
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

