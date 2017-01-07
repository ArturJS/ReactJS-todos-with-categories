import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoFilterActions from '../../actions/todo-filter-actions';
import './TodoFilter.scss';
import Checkbox from './../Checkbox/Checkbox';

class TodoFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDone: true,
      searchQuery: ''
    };
  }

  render() {
    let {todoFilterState} = this.props;
    const {updateTodoFilter} = this.props.actions;

    todoFilterState = todoFilterState.present;

    return (
      <div className="todo-filter-container">
        <h4>Todo Filter</h4>
        <label className="cp">
          <Checkbox value={todoFilterState.showDone} onChange={(value)=>{
            updateTodoFilter({showDone: value});
          }}/>
          &nbsp;Show done
        </label>
      </div>
    );
  }
}

TodoFilter.propTypes = {
  todoFilterState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    todoFilterState: state.todoFilterState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoFilterActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
