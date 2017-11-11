import React, {PropTypes, PureComponent} from 'react';
import Collapse from 'react-collapse';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';

import SubCategoryItem from './CategoryItem'; // necessary that child CategoryItems were wrapped with @observer
import './CategoryItem.scss';


@withRouter
@inject('categoriesStore', 'modalStore')
@observer
export default class CategoryItem extends PureComponent {
  static propTypes = {
    categoriesStore: PropTypes.object.isRequired,
    category: PropTypes.object,
    isAttachMode: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    // editingTodo: PropTypes.object.isRequired
  };

  static contextTypes = {
    showTodos: PropTypes.func.isRequired
  };

  state = {
    isEditing: false
  };

  _tempName;
  _nameInput;

  toggleExpand = () => {
    const {category} = this.props;
    this.props.categoriesStore.toggleExpandCategory(category.id);
  };

  addSubcategory = event => {
    event.stopPropagation();
    const {category} = this.props;
    this.props.categoriesStore.addCategory({
      parent: category,
      name: `${category.name}-${category.childs.length + 1}`
    });
  };

  deleteCategory = event => {
    event.stopPropagation();
    const {
      category
    } = this.props;

    this.props.modalStore.showConfirm({
      title: 'Please, confirm your action',
      body: `Are you sure you want to delete "${category.name}"?`
    })
      .result
      .then((shouldDelete) => {
        if (shouldDelete) {
          this.props.categoriesStore.removeCategory(category.id);
        }
      });
  };

  editCategory = event => {
    event.stopPropagation();
    this._tempName = this.props.category.name;
    this.setState({isEditing: true});
  };

  saveCategory = event => {
    event.stopPropagation();
    const {category} = this.props;
    const name = this._nameInput.value;
    this.props.categoriesStore.updateCategory({...category, name});
    this.setState({isEditing: false});
  };

  cancelEditing = event => {
    event.stopPropagation();
    this.setState({isEditing: false});
  };

  attachByCategoryId = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // const {
    //   editingTodoActions,
    //   categoryId,
    //   history,
    //   editingTodo
    // } = this.props;
    // editingTodoActions.updateEditingTodo({
    //   categoryId
    // });
    // history.replace(`/category/${categoryId}/todo/${editingTodo.id}`);
  };

  openRelatedTodos = (event) => {
    event.stopPropagation();
    this.context.showTodos();
  };

  stopPropagation(event) {
    event.stopPropagation();
  }

  render() {
    const {category, isAttachMode} = this.props;

    const {isExpanded} = category;
    const hasChilds = category.childs.length > 0;

    return (
      <div className="category-card">
        <div
          className="category-card-header"
          onClick={this.toggleExpand}
        >
          <i
            className={`
          category-toggle-open
          ${isExpanded ? 'is-expanded' : ''}
          ${hasChilds ? '' : 'hidden'}
          `}
          >
            <svg height="10" width="25">
              <path d="M 1 1 L 10 10 L 20 1"/>
            </svg>
          </i>
          {isAttachMode ? this.renderAttachMode() : this.renderDefaultMode()}
        </div>
        {hasChilds && this.renderChilds()}
      </div>
    );
  }

  renderAttachMode() {
    const {category} = this.props;

    return (
      <div className="category-name-with-controls">
        <span className="category-name-cnt">
            <NavLink
              to={`/category/${category.id}/`}
              onClick={this.stopPropagation}
              className={`category-name`}
              activeClassName={'active'}
            >
                {category.name}
            </NavLink>
        </span>
        <span className="category-controls-right attach-icon">
            <i
              className="glyphicon glyphicon-share-alt"
              onClick={this.attachByCategoryId}
            />
        </span>
      </div>
    );
  }

  renderDefaultMode() {
    const {isEditing} = this.state;
    const {category} = this.props;
    return (
      <div className="category-name-with-controls">
        {isEditing ? (
            <span className="category-input-cnt">
              <input
                type="text"
                className="category-input"
                ref={node => (this._nameInput = node)}
                autoFocus="autoFocus"
                onClick={this.stopPropagation}
                defaultValue={this._tempName}
              />
              <i
                className="glyphicon glyphicon-ok-circle category-control-icon"
                onClick={this.saveCategory}
              />
              <i
                className="glyphicon glyphicon-remove-circle category-control-icon"
                onClick={this.cancelEditing}
              />
            </span>
          ) : (
            <span className="category-name-cnt">
              <NavLink
                to={`/category/${category.id}/`}
                onClick={this.openRelatedTodos}
                className={`category-name`}
                activeClassName={'active'}
              >
                  {category.name}
              </NavLink>
              <i
                className="glyphicon glyphicon-pencil"
                onClick={this.editCategory}
              />
            </span>
          )}

        {this.renderRightControls()}
      </div>
    );
  }

  renderRightControls() {
    return (
      <span className="category-controls-right">
        <i className="glyphicon glyphicon-trash"
           onClick={this.deleteCategory}/>
        <i className="glyphicon glyphicon-plus-sign"
           onClick={this.addSubcategory}/>
      </span>
    );
  }

  renderChilds() {
    const {category, isAttachMode} = this.props;
    const {isExpanded} = category;

    return (
      <div className="category-card-body">
        <Collapse isOpened={isExpanded}>
          <ul className="category-card-body-wrap">
            {category.childs.map(category => (
              <li key={category.id}>
                <SubCategoryItem
                  category={category}
                  isAttachMode={isAttachMode}
                />
              </li>
            ))}
          </ul>
        </Collapse>
      </div>
    );
  }
}
