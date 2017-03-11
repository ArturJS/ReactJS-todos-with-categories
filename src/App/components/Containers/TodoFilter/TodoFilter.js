import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoFilterActions from '../../../actions/todo-filter-actions';
import './TodoFilter.scss';
import Checkbox from '../../Common/Checkbox/Checkbox';

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

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoFilter extends Component {
  static propTypes = {
    todoFilterState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showDone: true,
      searchQuery: ''
    };

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.resetSearchQuery = this.resetSearchQuery.bind(this);
  }

  updateSearchQuery = (event) => {
    this.props.actions.updateTodoFilter({searchQuery: event.target.value});
  };

  resetSearchQuery = () => {
    this.props.actions.updateTodoFilter({searchQuery: ''});
  };

  render() {
    let {todoFilterState} = this.props;
    const {updateTodoFilter} = this.props.actions;

    todoFilterState = todoFilterState.present;

    let {showDone, searchQuery} = todoFilterState;

    return (
      <div className="todo-filter">
        <label className="show-done">
          <Checkbox value={showDone} onChange={(value)=>{
            updateTodoFilter({showDone: value, searchQuery: searchQuery});
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
