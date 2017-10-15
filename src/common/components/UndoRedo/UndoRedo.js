import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from 'redux-undo';
import './UndoRedo.scss';

function mapStateToProps(state, props) {
  return {
    orm: state.orm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    undoRedoActions: bindActionCreators(ActionCreators, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UndoRedo extends PureComponent {
  static propTypes = {
    orm: PropTypes.object.isRequired,
    undoRedoActions: PropTypes.object.isRequired
  };

  undo = () => {
    this.props.undoRedoActions.undo();
  };

  redo = () => {
    this.props.undoRedoActions.redo();
  };

  render() {
    const {orm} = this.props;

    return (
      <div className="undo-redo-cnt">
        <button
          type="button"
          className="btn btn-default"
          disabled={orm.past.length === 0}
          onClick={this.undo}>
          <i className="glyphicon glyphicon-arrow-left"/>
        </button>
        <button
          type="button"
          className="btn btn-default"
          disabled={orm.future.length === 0}
          onClick={this.redo}>
          <i className="glyphicon glyphicon-arrow-right"/>
        </button>
      </div>
    );
  }
}
