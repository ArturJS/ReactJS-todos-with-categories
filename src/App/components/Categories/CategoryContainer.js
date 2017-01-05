import React, {PropTypes, Component} from 'react';
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

    this.state = {
      categoryList: [{
        parent: null,
        id: 1,
        name: '123',
        childs: []
      }]
    };
  }

  render() {
    let {categoryList} = this.state;

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
    newCategory = Object.assign({parent: null}, newCategory);

    this.setState({
      categoryList: [...this.state.categoryList, newCategory]
    });
  }

  addSubcategory(categoryId) {
    let {categoryList} = this.state;

    let relatedCategory = this.findRelatedCategory(categoryList, categoryId);

    if (relatedCategory) {
      relatedCategory.childs.push({
        id: Math.random(),
        name: relatedCategory.name + '-' + relatedCategory.childs.length,
        parent: relatedCategory,
        childs: []
      });

      this.setState({categoryList});
    }
  }

  deleteCategory(categoryId) {
    let {categoryList} = this.state;

    let relatedCategory = this.findRelatedCategory(categoryList, categoryId);

    if (relatedCategory) {
      const {parent} = relatedCategory;

      _.remove(parent ? parent.childs : categoryList, (o)=>o.id === categoryId);

      this.setState({categoryList});
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

export default CategoryContainer;
