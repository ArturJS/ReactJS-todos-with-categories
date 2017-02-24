import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import * as todoActions from '../../../actions/todo-actions';
import './TodoEditPage.scss';
import RaisedButton from 'material-ui/RaisedButton';

import Checkbox from '../../Common/Checkbox/Checkbox';
import CategoryContainer from '../../Common/CategoryContainer/CategoryContainer';

import {store} from '../../../store/store';


function mapStateToProps(state, props) {
  return {
    currentTodo: state.currentTodo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoEditPage extends Component {
  static propTypes = {
    currentTodo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const {currentTodo} = this.props;

    this.state = {
      tempTodo: Object.assign({}, currentTodo.present)
    };
  }

  saveChanges = () => {
    const {updateTodo} = todoActions;//this.props.actions;
    const {currentTodo} = this.props;
    let {tempTodo} = this.state;
    store.dispatch(updateTodo(currentTodo.present, tempTodo));

    this.goToRelatedCategoryPage(tempTodo.categoryId);
  };

  cancel = () => {
    const {categoryId} = this.props.currentTodo.present;
    this.goToRelatedCategoryPage(categoryId);
  };

  goToRelatedCategoryPage = (categoryId) => {
    let {searchQuery, showDone} = store.getState().todoFilterState.present;

    store.dispatch(
      push(`/category/${categoryId}${ searchQuery ? '/searchQuery/' + searchQuery : ''}${showDone ? '/showDone/true' : ''}`)
    );
  };

  updateTitle = (event) => {
    this.setState({
      tempTodo: Object.assign({}, this.state.tempTodo, {title: event.target.value})
    });
  };

  updateIsDone = (isDone) => {
    this.setState({
      tempTodo: Object.assign({}, this.state.tempTodo, {isDone: isDone})
    });
  };

  updateDescription = (event) => {
    this.setState({
      tempTodo: Object.assign({}, this.state.tempTodo, {description: event.target.value})
    });
  };

  attachByCategoryId = (categoryId) => {
    let {tempTodo} = this.state;
    this.setState({
      tempTodo: Object.assign({}, tempTodo, {categoryId: categoryId})
    });
    store.dispatch(push(`category/${categoryId}/todo/${tempTodo.id}`));
  };

  render() {
    const {tempTodo} = this.state;

    return (
      <div className="App-body">
        <div className="layout-header">
          <div className="layout-subheading">
            <h2 className="page-name">{tempTodo.title}</h2>
          </div>
        </div>
        <div className="layout-body">
          <div className="layout-left-pane">
            <CategoryContainer currentCategoryId={this.props.params.categoryId}
                               isAttachMode={true}
                               attachByCategoryId={this.attachByCategoryId}
            />
          </div>
          <div className="layout-right-pane">
            <div className="todo-edit-page">
              <div className="buttons-container clearfix">
                <div className="buttons-right">
                  <RaisedButton
                    className="button-item"
                    label="Save changes"
                    onClick={this.saveChanges}
                  />
                  <RaisedButton
                    className="button-item"
                    label="Cancel"
                    onClick={this.cancel}
                  />
                </div>
              </div>
              <div className="todo-edit-page--body">
                <p>
                  <input type="text"
                         className="todo-title-field"
                         placeholder="todo title here..."
                         defaultValue={tempTodo.title}
                         onInput={this.updateTitle}
                  />
                </p>
                <p>
                  <label className="todo-is-done">
                    <Checkbox value={tempTodo.isDone} onChange={this.updateIsDone}/>
                    &nbsp;
                    Done
                  </label>
                </p>
                <p className="todo-description-area-cnt">
                <textarea className="todo-description-area"
                          placeholder="todo description here..."
                          onInput={this.updateDescription}
                          defaultValue={tempTodo.description} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
