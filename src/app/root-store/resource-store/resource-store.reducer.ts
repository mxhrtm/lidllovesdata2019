import { ActionReducerMap } from '@ngrx/store';
import { State } from './resource-store.state';

import * as fromDashboard from './dashboard';


export const reducers: ActionReducerMap<State> = {
  Dashboard: fromDashboard.reducer
};