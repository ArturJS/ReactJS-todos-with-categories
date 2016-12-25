import React, {PropTypes, Component} from 'react';
import Collapse from 'react-collapse';
import './Category.scss';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  toggleExpand() {
    this.setState({
      isExpanded: !this.state.isExpanded//todo fix
    })
  }

  render() {
    let {category} = this.props;
    let {isExpanded} = this.state;
    let hasChilds = category.childs.length > 0;

    return (
      <div className="category-card">
        <div className="category-card-header"
             onClick={() => this.toggleExpand()}>
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
        </div>

        {
          hasChilds ?
            <div className="category-card-body">
              <Collapse isOpened={isExpanded}>
                <ul className="category-card-body-wrap">
                  {
                    category.childs.map((child) =>
                      <li key={child.id}>
                        <Category category={child}></Category>
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
  category: PropTypes.object.isRequired
};

export default Category;

