import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { bankingReducer } from './store/reducer/banking.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  banking: bankingReducer
};
