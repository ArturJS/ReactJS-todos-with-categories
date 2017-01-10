import React, {PropTypes, Component} from 'react';
import Collapse from 'react-collapse';
import './Category.scss';

class Category extends Component {
  _tempName;
  _nameInput;

  constructor(props) {
    super(props);

    let {category} = props;
    const categoryId = category.id;

    this.state = {
      isExpanded: category.isExpanded,
      isEditing: false
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.addSubcategory = this.addSubcategory.bind(this, categoryId);
    this.deleteCategory = this.deleteCategory.bind(this, categoryId);
    this.editCategory = this.editCategory.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
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

  editCategory(event) {
    event.stopPropagation();

    this._tempName = this.props.category.name;
    setTimeout(()=>{
      this._nameInput.focus();
    }, 0);

    this.setState({isEditing: true});
  }

  saveCategory(event) {
    event.stopPropagation();

    this.props.category.name = this._nameInput.value;

    this.setState({isEditing: false});
  }

  cancelEditing(event) {
    event.stopPropagation();

    this.setState({isEditing: false});
  }

  render() {
    let {category} = this.props;
    let {isExpanded, isEditing} = this.state;
    let hasChilds = category.childs.length > 0;

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

          {
            isEditing
              ?
                <span>
                  <input type="text"
                         ref={(node) => this._nameInput = node}
                         defaultValue={this._tempName}/>
                  <i className="glyphicon glyphicon-ok-circle"
                     onClick={this.saveCategory}></i>
                  <i className="glyphicon glyphicon-remove-circle"
                     onClick={this.cancelEditing}></i>
                </span>

              : <span>
                  <a className="category-name">{category.name}</a>
                  <i className="glyphicon glyphicon-pencil"
                     onClick={this.editCategory}></i>
                </span>
          }

          {this.renderRightControls()}
        </div>

        {
          hasChilds ?
            this.renderChilds()
            : ''
        }

      </div>
    );
  }

  renderRightControls() {
    return (
      <span className="category-controls-right">
        <i className="glyphicon glyphicon-trash"
           onClick={this.deleteCategory}></i>
        <i className="glyphicon glyphicon-plus-sign"
           onClick={this.addSubcategory}></i>
      </span>
    );
  }

  renderChilds() {
    let {category} = this.props;
    let {isExpanded} = this.state;
    const {addSubcategory, deleteCategory} = this.props;

    return (
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
    );
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  addSubcategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

export default Category;

