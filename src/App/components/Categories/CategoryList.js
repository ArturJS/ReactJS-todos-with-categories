import React, {PropTypes} from 'react';
import Category from './Category';

const CategoryList = ({categoryList}) => {
  return (
    <div>
      {categoryList.map((category) =>
        <Category key={category.id} category={category} />
      )}
    </div>
  );
};

CategoryList.propTypes = {
  categoryList: PropTypes.array.isRequired
};

export default CategoryList;
