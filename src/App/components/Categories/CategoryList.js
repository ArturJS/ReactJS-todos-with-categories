import React, {PropTypes} from 'react';
import Category from './Category';
import './CategoryList.scss';

const CategoryList = ({categoryList, currentCategoryId, isAttachMode, attachByCategoryId, addSubcategory, deleteCategory}) => {
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
};

CategoryList.propTypes = {
  categoryList: PropTypes.array.isRequired,
  addSubcategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

export default CategoryList;
