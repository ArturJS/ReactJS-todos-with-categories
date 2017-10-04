import React, { PropTypes, PureComponent } from "react";
import { connect } from "react-redux";
import getProgress from "./ProgressBar.selector";
import "./ProgressBar.scss";

function mapStateToProps(state, props) {
  return {
    progress: getProgress(state)
  };
}

@connect(mapStateToProps)
export default class ProgressBar extends PureComponent {
  static propTypes = {
    progress: PropTypes.number
  };

  render() {
    const { progress } = this.props;
    return (
      <div className="progress-bar">
        <div className="progress-line" style={{ width: `${progress}%` }} />
      </div>
    );
  }
}
