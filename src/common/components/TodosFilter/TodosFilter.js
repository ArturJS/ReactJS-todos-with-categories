import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';

import {updateTodosFilter, initialTodosFilterState} from '../../ducks/todos-filter.ducks';
import Checkbox from '../Checkbox';
import './TodosFilter.scss';


function mapStateToProps(state, props) {
  return {
    todosFilter: state.todosFilter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateTodosFilter: bindActionCreators(updateTodosFilter, dispatch)
  }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class TodosFilter extends PureComponent {
  static propTypes = {
    updateTodosFilter: PropTypes.func.isRequired,
    todosFilter: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.onHistoryChange(this.props.location);
    this.unlisten = this.props.history.listen(this.onHistoryChange);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentWillReceiveProps(nextProps) {
    this.updateUrlSearchQuery(nextProps.todosFilter);
  }

  updateUrlSearchQuery = (todosFilter) => {
    const {
      pathname,
      search
    } = this.props.location;
    todosFilter = _.omitBy(todosFilter, value => !value);
    const newSearch = queryString.stringify(todosFilter);

    if (search.replace('?', '') !== newSearch) {
      this.props.history.replace(`${pathname}?${newSearch}`);
    }
  };

  onHistoryChange = ({search}) => {
    const queryParams = queryString.parse(search);
    this.updateTodosFilter({
      ...initialTodosFilterState,
      ...queryParams
    });
  };

  updateTodosFilter = ({showDone, searchQuery}) => {
    const patchForTodosFilterState = this.createPatch({showDone, searchQuery});
    if (!_.isEmpty(patchForTodosFilterState)) {
      this.props.updateTodosFilter(patchForTodosFilterState);
    }
  };

  createPatch = ({showDone, searchQuery}) => {
    const patch = {};
    const {todosFilter} = this.props;

    if (typeof showDone === 'boolean' && showDone !== todosFilter.showDone) {
      patch.showDone = showDone;
    }
    if (typeof searchQuery === 'string' && searchQuery.trim().toLowerCase() !== todosFilter.searchQuery) {
      patch.searchQuery = searchQuery;
    }

    return patch;
  };

  onShowDoneChange = (value) => {
    this.updateTodosFilter({showDone: value});
  };

  updateSearchQuery = (event) => {
    this.updateTodosFilter({searchQuery: event.target.value});
  };

  resetSearchQuery = () => {
    this.updateTodosFilter({searchQuery: ''});
  };

  render() {
    const {showDone, searchQuery} = this.props.todosFilter;

    return (
      <div className="todo-filter">
        <label className="show-done">
          <Checkbox value={showDone}
                    onChange={this.onShowDoneChange}/>
          &nbsp;Show done
        </label>
        <div className="search-input-cnt">
          <input type="text"
                 className="search-input"
                 value={searchQuery}
                 onInput={this.updateSearchQuery}
                 placeholder="search todo..."
          />
          <button type="button"
                  className="reset-search-input"
                  onClick={this.resetSearchQuery}>&times;</button>
        </div>
      </div>
    );
  }
}
