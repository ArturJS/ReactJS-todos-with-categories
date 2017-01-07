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

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.resetSearchQuery = this.resetSearchQuery.bind(this);
  }

  updateSearchQuery(event) {
    this.props.actions.updateTodoFilter({searchQuery: event.target.value});
  }

  resetSearchQuery() {
    this.props.actions.updateTodoFilter({searchQuery: ''});
  }

  render() {
    let {todoFilterState} = this.props;
    const {updateTodoFilter} = this.props.actions;

    todoFilterState = todoFilterState.present;

    let {showDone, searchQuery} = todoFilterState;

    return (
      <div className="todo-filter">
        <h4>Todo Filter</h4>
        <label className="show-done">
          <Checkbox value={showDone} onChange={(value)=>{
            updateTodoFilter({showDone: value});
          }}/>
          &nbsp;Show done
        </label>
        <div className="search-input-cnt">
          <input type="text"
                 className="search-input"
                 value={searchQuery}
                 onInput={this.updateSearchQuery}
                 placeholder="search todo..."
          />
          <button className="reset-search-input"
                  onClick={this.resetSearchQuery}>&times;</button>
        </div>

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
