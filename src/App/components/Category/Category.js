import React, {PropTypes, Component} from 'react';
import Collapse from 'react-collapse';
import './Category.scss';
import {Link} from 'react-router';

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
    this.stopPropagation = this.stopPropagation.bind(this);
    this.attachByCategoryId = this.attachByCategoryId.bind(this);
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
    setTimeout(()=> {
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

  attachByCategoryId(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.attachByCategoryId(this.props.category.id);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  render() {
    let {category, isAttachMode} = this.props;
    let {isExpanded} = this.state;
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
                 width="25">
              <path d="M 1 1 L 10 10 L 20 1"></path>
            </svg>
          </i>
          {
            isAttachMode ? this.renderAttachMode() : this.renderDefaultMode()
          }
        </div>
        {
          hasChilds ? this.renderChilds() : ''
        }
      </div>
    );
  }

  renderAttachMode() {
    let {category, currentCategoryId} = this.props;
    return (
      <div className="category-name-with-controls">
        <span className="category-name-cnt">
          <Link to={'category/' + category.id}
                onClick={this.stopPropagation}
                className={`category-name ${category.id === currentCategoryId ? 'category-selected' : ''}`}>
            {category.name}
          </Link>
        </span>
        <span className="category-controls-right attach-icon">
        <i className="glyphicon glyphicon-share-alt"
           onClick={this.attachByCategoryId}></i>
        </span>
      </div>
    );
  }

  renderDefaultMode() {
    let {isEditing} = this.state;
    let {category, currentCategoryId} = this.props;
    return (
      <div className="category-name-with-controls">
        {
          isEditing
            ?
            <span className="category-input-cnt">
                  <input type="text"
                         className="category-input"
                         ref={(node) => this._nameInput = node}
                         onClick={this.stopPropagation}
                         defaultValue={this._tempName}/>
                  <i className="glyphicon glyphicon-ok-circle category-control-icon"
                     onClick={this.saveCategory}></i>
                  <i className="glyphicon glyphicon-remove-circle category-control-icon"
                     onClick={this.cancelEditing}></i>
                </span>

            : <span className="category-name-cnt">
                  <Link to={'category/' + category.id}
                        onClick={this.stopPropagation}
                        className={`category-name ${category.id === currentCategoryId ? 'category-selected' : ''}`}>
                    {category.name}
                  </Link>
                  <i className="glyphicon glyphicon-pencil"
                     onClick={this.editCategory}></i>
                </span>
        }

        {this.renderRightControls()}
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
    let {category, currentCategoryId} = this.props;
    let {isExpanded} = this.state;
    const {addSubcategory, deleteCategory, attachByCategoryId, isAttachMode} = this.props;

    return (
      <div className="category-card-body">
        <Collapse isOpened={!!isExpanded}>
          <ul className="category-card-body-wrap">
            {
              category.childs.map((child) =>
                <li key={child.id}>
                  <Category category={child}
                            currentCategoryId={currentCategoryId}
                            addSubcategory={addSubcategory}
                            deleteCategory={deleteCategory}
                            isAttachMode={isAttachMode}
                            attachByCategoryId={attachByCategoryId}
                  ></Category>
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

