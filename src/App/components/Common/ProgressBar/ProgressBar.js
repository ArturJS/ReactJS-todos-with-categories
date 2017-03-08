import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import getProgress from './ProgressBar.selector';
import './ProgressBar.scss';

function mapStateToProps(state, props) {
  return {
    progress: getProgress(state)
  };
}

@connect(mapStateToProps)
export default class ProgressBar extends Component {
  static propTypes = {
    progress: PropTypes.number
  };

  render() {
    return (
      <div className="progress-bar-cnt">
        <LinearProgress className="progress-bar" mode="determinate" value={this.props.progress}/>
      </div>
    );
  }
}
