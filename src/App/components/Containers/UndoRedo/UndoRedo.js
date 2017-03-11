import React, {Component} from 'react';
import './UndoRedo.scss';
import {ActionCreators} from 'redux-undo';
import {store} from '../../../store/store';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class UndoRedo extends Component {
  
  undo = () => {
    store.dispatch(ActionCreators.undo());
  };

  redo = () => {
    store.dispatch(ActionCreators.redo());
  };

  render() {
    return (
      <div className="undo-redo-cnt">
        <FloatingActionButton onClick={this.undo} className={'undo-button'}>
          <i className="glyphicon glyphicon-share-alt undo-icon" />
        </FloatingActionButton>
        <FloatingActionButton onClick={this.redo}>
          <i className="glyphicon glyphicon-share-alt" />
        </FloatingActionButton>
      </div>
    );
  }
}
