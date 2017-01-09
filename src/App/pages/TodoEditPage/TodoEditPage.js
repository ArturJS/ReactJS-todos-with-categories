import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../actions/todo-actions';
import './TodoEditPage.scss';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router';
import CategoryContainer from '../../components/Categories/CategoryContainer';

import {store} from '../../store/store';

class TodoEditPage extends Component {
  _tempTodo;

  constructor(props) {
    super(props);

    this.saveChanges = this.saveChanges.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  saveChanges() {
    const {updateTodo} = this.props.actions;
    const {currentTodo} = this.props;
    store.dispatch(updateTodo(currentTodo, this._tempTodo));
  }

  cancel() {
    //store.dispatch();//use goBack() from react-router-redux
  }

  render() {
    const {currentTodo} = this.props;

    this._tempTodo = Object.assign({}, currentTodo.present);

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

            {this._tempTodo.title}
            <br/>
            {this._tempTodo.description}

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
