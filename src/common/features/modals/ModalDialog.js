import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import _ from 'lodash';

import * as modalActions from './modal.ducks';
import {MODAL_TYPES} from './modal-provider';
import './ModalDialog.scss';


function mapStateToProps(state, props) {
  return {
    modalStack: state.modalStack
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ModalDialog extends PureComponent {
  static propTypes = {
    modalStack: PropTypes.array.isRequired,
    modalActions: PropTypes.object.isRequired
  };

  static noBackdropStyle = {
    overlay: {
      backgroundColor: 'transparent',
      pointerEvents: 'none',
      zIndex: 1080
    }
  };

  close = (event) => {
    const {id} = event.target.dataset;
    this.props.modalActions.closeModal({
      id,
      reason: true
    })
  };

  dismiss = (event) => {
    const {id} = event.target.dataset;
    this.props.modalActions.closeModal({
      id,
      reason: false
    })
  };

  render() {
    const {modalStack} = this.props;

    return (
      <span>
        {modalStack.map(modal => (
          <Modal
            key={modal.id}
            isOpen={true}
            onRequestClose={this.dismiss}
            style={modal.noBackdrop ? ModalDialog.noBackdropStyle : {}}
            className={`modal ${modal.className}`}
            shouldCloseOnOverlayClick={modal.shouldCloseOnOverlayClick}
            contentLabel={''}>
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-id={modal.id}
                onClick={this.dismiss}>
                &times;
              </button>
              <div className="modal-header">
                <h3 className="modal-title">
                  {modal.title}
                </h3>
              </div>
              {modal.type === MODAL_TYPES.custom &&
              <div className="modal-custom-body">
                {modal.body && modal.body.length && typeof modal.body !== 'string' ?
                  _.map(modal.body, item => <p key={item}>{item}</p>) : modal.body
                }
              </div>
              }
              {modal.type !== MODAL_TYPES.custom &&
              <div>
                <div className="modal-body">
                  {modal.body && modal.body.length && typeof modal.body !== 'string' ?
                    _.map(modal.body, item => <p key={item}>{item}</p>) : modal.body
                  }
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-id={modal.id}
                    onClick={this.close}>
                    Ok
                  </button>
                  {modal.type === MODAL_TYPES.confirm &&
                  <button
                    className="btn btn-default"
                    type="button"
                    data-id={modal.id}
                    onClick={this.dismiss}>
                    Cancel
                  </button>
                  }
                </div>
              </div>
              }
            </div>
          </Modal>
        ))}
      </span>
    );
  }
}
