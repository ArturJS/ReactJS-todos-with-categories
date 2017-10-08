import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {overallProgress} from '../../orm/selectors/todo.selectors';
import './ProgressBar.scss';


function mapStateToProps(state, props) {
  return {
    progress: overallProgress(state)
  };
}

@connect(mapStateToProps)
export default class ProgressBar extends PureComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  render() {
    const {progress} = this.props;
    return (
      <div className="progress-bar">
        <div className="progress-line" style={{width: `${progress}%`}}/>
      </div>
    );
  }
}
