import {Action} from 'redux';
import {store, RootState} from '../models/store';

export const selector = (fn: (state: RootState) => void) => {
  const state: RootState = store.getState();
  return fn(state);
};

export const dispatch = (action: Action) => {
  return store.dispatch(action);
};
