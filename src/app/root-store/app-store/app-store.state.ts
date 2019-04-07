import { createFeatureSelector } from '@ngrx/store';

import * as fromRouterStore from '@ngrx/router-store';
import { RouterStateUrl } from './router/router.state';

export interface State {
  router: fromRouterStore.RouterReducerState<RouterStateUrl>
}


export const getState = createFeatureSelector<State>(
  'app-store'
);