import _ from 'lodash';
import configureStore from './configure-store.js';
import persistentStorage from '../features/persistent-storage';

const STORE_KEY = 'REACTJS-LEARNING/REDUX_STORE';
const initialState = persistentStorage.getItem(STORE_KEY);
const store = configureStore(initialState);

store.subscribe(_.throttle(() => {
  const state = store.getState();
  const dataToSave = {
    orm: state.orm,
    todosFilter: state.todosFilter
  };
  persistentStorage.setItem(STORE_KEY, dataToSave);
}, 1000));

export default store;
