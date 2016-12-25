import React, {PropTypes, Component} from 'react';
import CategoryList from './CategoryList';
import './CategoryContainer.scss';

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let categoryList = [{
      id: 1,
      name: '123',
      childs: [
        {
          id: 2,
          name: '123-1',
          childs: []
        },
        {
          id: 3,
          name: '123-2',
          childs: []
        },
        {
          id: 4,
          name: '123-3',
          childs: []
        }
      ]
    }];

    return (
      <div className="category-container">
        <CategoryList categoryList={categoryList}/>
      </div>
    );
  }
}

export default CategoryContainer;
