import React, {PropTypes, Component} from 'react';
import Category from '../Category/Category';
import './CategoryList.scss';

export default class CategoryList extends Component {
  static propTypes = {
    categoryList: PropTypes.array.isRequired,
    addSubcategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
  };
  
  render() {
    let {
      categoryList, 
      currentCategoryId, 
      isAttachMode, 
      attachByCategoryId, 
      addSubcategory, 
      deleteCategory
    } = this.props;
    
    return (
      <div className="category-list">
        {categoryList.map((category) =>
          <Category key={category.id}
                    currentCategoryId={currentCategoryId}
                    isAttachMode={isAttachMode}
                    attachByCategoryId={attachByCategoryId}
                    category={category}
                    addSubcategory={addSubcategory}
                    deleteCategory={deleteCategory}/>
        )}
      </div>
    );
  }
}
