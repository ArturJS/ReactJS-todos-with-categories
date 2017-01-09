import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
    this.updateIsDone = this.updateIsDone.bind(this);
  }

  saveChanges() {
    const {updateTodo} = this.props.actions;
    const {currentTodo} = this.props;
    store.dispatch(updateTodo(currentTodo, this.state.tempTodo));
  }

  cancel() {
    //store.dispatch();//use goBack() from react-router-redux
  }

  updateIsDone(isDone) {
    this.setState({
      tempTodo: Object.assign({}, this.state.tempTodo, {isDone: isDone})
    });
  }

  render() {
    const {tempTodo} = this.state;

    return (
      <div className="App-body">
        <div className="layout-left-pane">
          <ul>
            <li><Link to={`/todo/${123}`}>todo 123</Link></li>
            <li><Link to={`/`}>Home page</Link></li>
          </ul>
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

            <p>
              <input type="text"
                     className="todo-title-field"
                     defaultValue={tempTodo.title}
              />
            </p>
            <p>
              <label className="cp">
                <Checkbox value={tempTodo.isDone} onChange={this.updateIsDone} />
                &nbsp;
                Done
              </label>
            </p>
            <p>
              <textarea defaultValue={tempTodo.description}></textarea>
            </p>

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
