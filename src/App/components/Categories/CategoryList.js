import React, {PropTypes} from 'react';
import Category from './Category';

const CategoryList = ({categoryList, addSubcategory, deleteCategory}) => {
  return (
    <div>
      {categoryList.map((category) =>
        <Category key={category.id} 
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
