import shortid from 'shortid';

import {types} from 'mobx-state-tree';


export const MODAL_TYPES = {
  error: 'ERROR_MODAL',
  confirm: 'CONFIRM_MODAL',
  info: 'INFO_MODAL',
  custom: 'CUSTOM_MODAL'
};

class Modal {
  constructor({
                id,
                title = '',
                body,
                type,
                close,
                className = '',
                shouldCloseOnOverlayClick = true,
                noBackdrop = false
              }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.type = type;
    this.close = close;
    this.className = className;
    this.shouldCloseOnOverlayClick = shouldCloseOnOverlayClick;
    this.noBackdrop = noBackdrop;
  }
}

const ModalStore = types.model('ModalStore', {
  modalStack: types.array(types.frozen)
})
  .actions(self => ({
    showConfirm({title, body, className}) {
      const {result, close} = self._openModal({
        title,
        body,
        type: MODAL_TYPES.confirm,
        className
      });

      return {
        result,
        close
      };
    },

    showCustom({title, body, className}) {
      const {result, close} = self._openModal({
        title,
        body,
        type: MODAL_TYPES.custom,
        className
      });

      return {
        result,
        close
      };
    },

    close({id, reason}) {
      const relatedModal = self.modalStack.find(modal => modal.id === id);

      if (relatedModal) {
        relatedModal.close(reason);
      }

      self._closeModal(id);
    },

    closeAll(reason) {
      self.modalStack.forEach(modal => modal.close(reason));
      self.modalStack.replace([]);
    },

    _openModal({title, body, type, className}) {
      let close;
      const result = new Promise((resolve) => {
        close = resolve;
      });
      const id = shortid.generate();

      const modalInstance = new Modal({
        id,
        title,
        body,
        type,
        className,
        close
      });

      self.modalStack.push(
        modalInstance
      );

      result.then(() => {
        self._closeModal(id);
      });

      return {
        result,
        close
      };
    },

    _closeModal(id) {
      self.modalStack = self.modalStack.filter(modal => modal.id !== id);
    }
  }));

export default ModalStore.create({modalStack: []});
