import React, {PropTypes, Component} from 'react';
import Collapse from 'react-collapse';
import './Category.scss';

class Category extends Component {
  constructor(props) {
    super(props);

    let {category} = props;
    const categoryId = category.id;

    this.state = {
      isExpanded: category.isExpanded
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.addSubcategory = this.addSubcategory.bind(this, categoryId);
    this.deleteCategory = this.deleteCategory.bind(this, categoryId);
  }

  toggleExpand() {
    this.setState({
      isExpanded: !this.state.isExpanded//todo fix
    });

    let {category} = this.props;

    category.isExpanded = !category.isExpanded;
  }

  addSubcategory(categoryId, event) {
    event.stopPropagation();
    this.props.addSubcategory(categoryId);
  }

  deleteCategory(categoryId, event) {
    event.stopPropagation();
    this.props.deleteCategory(categoryId);
  }

  render() {
    let {category} = this.props;
    let {isExpanded} = this.state;
    let hasChilds = category.childs.length > 0;
    const {addSubcategory, deleteCategory} = this.props;

    return (
      <div className="category-card">
        <div className="category-card-header"
             onClick={this.toggleExpand}>
          <i className={`
          category-toggle-open
          ${isExpanded ? 'is-expanded' : ''}
          ${hasChilds ? '' : 'hidden'}
          `}>
            <svg height="10"
                 width="20">
              <path d="M 1 1 L 10 10 L 20 1"></path>
            </svg>
          </i>
          <a className="category-name">{category.name}</a>
          <i className="glyphicon glyphicon-pencil"></i>
          <span className="category-controls-right">
            <i className="glyphicon glyphicon-trash"
               onClick={this.deleteCategory}></i>
            <i className="glyphicon glyphicon-plus-sign"
               onClick={this.addSubcategory}></i>
          </span>
        </div>

        {
          hasChilds ?
            <div className="category-card-body">
              <Collapse isOpened={isExpanded}>
                <ul className="category-card-body-wrap">
                  {
                    category.childs.map((child) =>
                      <li key={child.id}>
                        <Category category={child}
                                  addSubcategory={addSubcategory}
                                  deleteCategory={deleteCategory}></Category>
                      </li>
                    )
                  }
                </ul>
              </Collapse>
            </div>
            : ''
        }

      </div>
    );
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  addSubcategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

export default Category;

