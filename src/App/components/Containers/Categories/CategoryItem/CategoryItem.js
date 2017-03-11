import React, {PropTypes, Component} from 'react';
import Collapse from 'react-collapse';
import './CategoryItem.scss';
import {Link} from 'react-router';

export default class CategoryItem extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    addSubcategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
  };

  _tempName;
  _nameInput;

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: props.category.isExpanded || false,
      isEditing: false
    };
  }

  toggleExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });

    let {category} = this.props;

    category.isExpanded = !category.isExpanded;
  };

  addSubcategory = (event) => {
    event.stopPropagation();
    this.props.addSubcategory(this.props.category.id);
  };

  deleteCategory = (event) => {
    event.stopPropagation();
    this.props.deleteCategory(this.props.category.id);
  };

  editCategory = (event) => {
    event.stopPropagation();

    this._tempName = this.props.category.name;
    setTimeout(()=> {
      this._nameInput.focus();
    }, 0);

    this.setState({isEditing: true});
  };

  saveCategory = (event) => {
    event.stopPropagation();

    this.props.category.name = this._nameInput.value;

    this.setState({isEditing: false});
  };

  cancelEditing = (event) => {
    event.stopPropagation();

    this.setState({isEditing: false});
  };

  attachByCategoryId = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.attachByCategoryId(this.props.category.id);
  };

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
              <path d="M 1 1 L 10 10 L 20 1" />
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
           onClick={this.attachByCategoryId} />
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
                     onClick={this.saveCategory} />
                  <i className="glyphicon glyphicon-remove-circle category-control-icon"
                     onClick={this.cancelEditing} />
                </span>

            : <span className="category-name-cnt">
                  <Link to={'category/' + category.id}
                        onClick={this.stopPropagation}
                        className={`category-name ${category.id === currentCategoryId ? 'category-selected' : ''}`}>
                    {category.name}
                  </Link>
                  <i className="glyphicon glyphicon-pencil"
                     onClick={this.editCategory} />
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
           onClick={this.deleteCategory} />
        <i className="glyphicon glyphicon-plus-sign"
           onClick={this.addSubcategory} />
      </span>
    );
  }

  renderChilds() {
    let {category, currentCategoryId} = this.props;
    let {isExpanded} = this.state;
    const {addSubcategory, deleteCategory, attachByCategoryId, isAttachMode} = this.props;

    return (
      <div className="category-card-body">
        <Collapse isOpened={isExpanded}>
          <ul className="category-card-body-wrap">
            {
              category.childs.map((child) =>
                <li key={child.id}>
                  <CategoryItem category={child}
                            currentCategoryId={currentCategoryId}
                            addSubcategory={addSubcategory}
                            deleteCategory={deleteCategory}
                            isAttachMode={isAttachMode}
                            attachByCategoryId={attachByCategoryId}
                  />
                </li>
              )
            }
          </ul>
        </Collapse>
      </div>
    );
  }
}

