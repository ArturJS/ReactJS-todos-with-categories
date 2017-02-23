import React, {Component} from 'react';
import './UndoRedo.scss';
import {ActionCreators} from 'redux-undo';
import {store} from '../../../store/store';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class UndoRedo extends Component {
  constructor(props) {
    super(props);

    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
  }

  undo() {
    store.dispatch(ActionCreators.undo());
  }

  redo() {
    store.dispatch(ActionCreators.redo());
  }

  render() {
    return (
      <div className="undo-redo-cnt">
        <FloatingActionButton onClick={this.undo} className={'undo-button'}>
          <i className="glyphicon glyphicon-share-alt undo-icon"></i>
        </FloatingActionButton>
        <FloatingActionButton onClick={this.redo}>
          <i className="glyphicon glyphicon-share-alt"></i>
        </FloatingActionButton>
      </div>
    );
  }
}

export default UndoRedo;
