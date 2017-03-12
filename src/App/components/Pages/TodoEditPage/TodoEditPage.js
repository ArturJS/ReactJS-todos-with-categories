import React, {PropTypes, Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import * as todoActions from '../../../actions/todo-actions';
import * as currentTodoActions from '../../../actions/current-todo-actions';
import './TodoEditPage.scss';
import RaisedButton from 'material-ui/RaisedButton';

import Checkbox from '../../Common/Checkbox/Checkbox';


function mapStateToProps(state, props) {
  return {
    todoList: state.todoList.present,
    currentTodo: state.currentTodo,
    todoFilterState: state.todoFilterState.present
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActions, dispatch),
    routerActions: bindActionCreators({push}, dispatch),
    currentTodoActions: bindActionCreators(currentTodoActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoEditPage extends Component {
  static propTypes = {
    currentTodo: PropTypes.object.isRequired,
    todoActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      tempTodo: {...this.props.currentTodo}
    };
  }

  componentDidMount() {
    const {todoId} = this.props.params;
    const relatedTodo = _.find(this.props.todoList, (todo)=> todo.id === todoId);
    this.props.currentTodoActions.updateCurrentTodo(relatedTodo);
  }

  componentWillReceiveProps(nextProps) {
    const {currentTodo} = nextProps;
    this.setState({
      tempTodo: {...currentTodo, categoryId: this.state.tempTodo.categoryId}
    });
  }

  saveChanges = () => {
    const {currentTodo} = this.props;
    let {tempTodo} = this.state;

    tempTodo.categoryId = currentTodo.categoryId;

    this.props.todoActions.updateTodo(currentTodo, tempTodo);

    this.goToRelatedCategoryPage(tempTodo.categoryId);
  };

  cancel = () => {
    const {categoryId} = this.state.tempTodo;
    this.goToRelatedCategoryPage(categoryId);
  };

  goToRelatedCategoryPage = (categoryId) => {
    let {searchQuery, showDone} = this.props.todoFilterState;

    searchQuery = searchQuery ? '/searchQuery/' + searchQuery : '';
    showDone = showDone ? '/showDone/true' : '';

    this.props.routerActions.push(`/category/${categoryId}${searchQuery}${showDone}`);
  };

  updateTitle = (event) => {
    let title = event.target.value;

    this.setState({
      tempTodo: {...this.state.tempTodo, title}
    });

    this.props.currentTodoActions.updateCurrentTodo({title});
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
    this.props.routerActions.push(`category/${categoryId}/todo/${tempTodo.id}`);
  };

  render() {
    const {tempTodo} = this.state;

    return (
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
                   value={tempTodo.title}
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
                          value={tempTodo.description}/>
          </p>
        </div>
      </div>
    );
  }
}
