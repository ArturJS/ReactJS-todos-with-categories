const OPEN_MODAL = 'reactjs-learning/Modals/OPEN_MODAL';
const CLOSE_MODAL = 'reactjs-learning/Modals/CLOSE_MODAL';
const CLOSE_ALL_MODALS = 'reactjs-learning/Modals/CLOSE_ALL_MODALS';

const initialState = [];

export default (state = initialState, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case OPEN_MODAL:
      return [...state, payload.modalInstance];
    case CLOSE_MODAL: {
      const {id, reason} = payload;
      const relatedModal = state.find(modal => modal.id === id);

      if (relatedModal && relatedModal.close) {
        relatedModal.close(reason);
      }

      return state.filter(modal => modal.id !== id);
    }
    case CLOSE_ALL_MODALS: {
      const {reason} = payload;
      state.forEach(modal => modal.close(reason));
      return [];
    }
    default:
      return state;
  }
};

export const openModal = (modalInstance) => {
  return {
    type: OPEN_MODAL,
    payload: {
      modalInstance
    }
  }
};

export const closeModal = ({id, reason}) => {
  return {
    type: CLOSE_MODAL,
    payload: {
      id,
      reason
    }
  }
};

export const closeAllModals = ({reason}) => {
  return {
    type: CLOSE_MODAL,
    payload: {
      reason
    }
  }
};
