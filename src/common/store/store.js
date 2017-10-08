import _ from 'lodash';
import configureStore from './configure-store.js';
import persistentStorage from '../utils/persistent.storage';

const STORE_KEY = 'REACTJS-LEARNING/REDUX_STORE';
const initialState = persistentStorage.getItem(STORE_KEY);
const store = configureStore(initialState);

store.subscribe(_.throttle(() => {
  persistentStorage.setItem(STORE_KEY, store.getState());
}, 1000));

export default store;
