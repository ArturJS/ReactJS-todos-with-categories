import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import getProgress from '../../../selectors/progress.selector';
import './ProgressBar.scss';

class ProgressBar extends Component {
  render() {
    return (
      <div className="progress-bar-cnt">
        <LinearProgress className="progress-bar" mode="determinate" value={this.props.progress}/>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

function mapStateToProps(state, props) {
  return {
    progress: getProgress(state)
  };
}

export default connect(mapStateToProps)(ProgressBar);
