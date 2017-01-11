import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import * as todoActions from '../../actions/todo-actions';
import './TodoEditPage.scss';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router';
import Checkbox from '../../components/Checkbox/Checkbox';
import CategoryContainer from '../../components/Categories/CategoryContainer';

import {store} from '../../store/store';

class TodoEditPage extends Component {

  constructor(props) {
    super(props);

    console.dir(props);

    const {currentTodo} = this.props;

    this.state = {
      tempTodo: Object.assign({}, currentTodo.present)
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateIsDone = this.updateIsDone.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  saveChanges() {
    const {updateTodo} = this.props.actions;
    const {currentTodo} = this.props;
    store.dispatch(updateTodo(currentTodo.present, this.state.tempTodo));
    store.dispatch(push('/'));
  }

  cancel() {
    store.dispatch(push('/'));
  }

  updateTitle(event) {
    this.setState({
      tempTodo: Object.assign({}, this.state.tempTodo, {title: event.target.value})
    });
  }

  updateIsDone(isDone) {
    this.setState({
      tempTodo: Object.assign({}, this.state.tempTodo, {isDone: isDone})
    });
  }

  updateDescription(event) {
    this.setState({
      tempTodo: Object.assign({}, this.state.tempTodo, {description: event.target.value})
    });
  }

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
            <CategoryContainer />
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
                    <Checkbox value={tempTodo.isDone} onChange={this.updateIsDone} />
                    &nbsp;
                    Done
                  </label>
                </p>
                <p className="todo-description-area-cnt">
                <textarea className="todo-description-area"
                          placeholder="todo description here..."
                          onInput={this.updateDescription}
                          defaultValue={tempTodo.description}></textarea>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

TodoEditPage.propTypes = {
  currentTodo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

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

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditPage);
