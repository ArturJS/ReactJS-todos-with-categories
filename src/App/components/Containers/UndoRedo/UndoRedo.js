import React, { PureComponent } from "react";
import "./UndoRedo.scss";
import { ActionCreators } from "redux-undo";
import { store } from "../../../store/store";

export default class UndoRedo extends PureComponent {
  undo = () => {
    store.dispatch(ActionCreators.undo());
  };

  redo = () => {
    store.dispatch(ActionCreators.redo());
  };

  render() {
    return (
      <div className="undo-redo-cnt">
        <button type="button" className="btn btn-default" onClick={this.undo}>
          <i className="glyphicon glyphicon glyphicon-arrow-left" />
        </button>
        <button type="button" className="btn btn-default" onClick={this.redo}>
          <i className="glyphicon glyphicon glyphicon-arrow-right" />
        </button>
      </div>
    );
  }
}
