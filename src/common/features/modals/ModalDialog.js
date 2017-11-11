import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Modal from 'react-modal';
import _ from 'lodash';

import {MODAL_TYPES} from './modal.store';
import './ModalDialog.scss';


@inject('modalStore')
@observer
export default class ModalDialog extends PureComponent {
  static propTypes = {
    modalStore: PropTypes.object.isRequired
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
    this.props.modalStore.close({
      id,
      reason: true
    });
  };

  dismiss = (event) => {
    const {id} = event.target.dataset;
    this.props.modalStore.close({
      id,
      reason: false
    });
  };

  render() {
    const {modalStack} = this.props.modalStore;

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
