import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router';
import * as todoFilterActions from '../../../actions/todo-filter-actions';
import './TodoFilter.scss';
import Checkbox from '../../Common/Checkbox/Checkbox';
import _ from 'lodash';

function mapQueryParams(queryParams) {
  const existingEntries = Object.entries(queryParams).filter(([key, value]) => value);

  if (existingEntries.length === 0) return '';

  return '?' + existingEntries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                              .join('&');
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoFilterActions, dispatch)
  }
}

@connect(()=>({}), mapDispatchToProps)
export default class TodoFilter extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  state = {
    showDone: true,
    searchQuery: ''
  };

  componentDidMount() {
    this.updateState(
      hashHistory.getCurrentLocation()
    );

    this.unlisten = hashHistory.listen(this.updateState);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  updateState = (location) => {
    let {showDone, searchQuery} = location.query;

    showDone = showDone === 'true';
    searchQuery = searchQuery || '';

    this.setState({
      showDone,
      searchQuery
    });

    this.props.actions.updateTodoFilter({showDone, searchQuery});
  };

  updateTodoFilter = ({showDone, searchQuery}) => {
    this.props.actions.updateTodoFilter({showDone, searchQuery});

    const location = hashHistory.getCurrentLocation();
    const {query} = location;

    let queryPath = mapQueryParams({
      showDone: _.isUndefined(showDone) ? query.showDone : showDone,
      searchQuery: _.isUndefined(searchQuery) ? query.searchQuery : searchQuery,
    });

    hashHistory.replace(location.pathname + queryPath);
  };

  onShowDoneChange = (value) => {
    this.updateTodoFilter({showDone: value});
  };

  updateSearchQuery = (event) => {
    this.updateTodoFilter({searchQuery: event.target.value});
  };

  resetSearchQuery = () => {
    this.updateTodoFilter({searchQuery: ''});
  };

  render() {
    const {showDone, searchQuery} = this.state;

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
