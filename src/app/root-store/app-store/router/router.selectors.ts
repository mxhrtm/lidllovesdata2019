import { createSelector } from '@ngrx/store';

import * as fromFeatureState from '../app-store.state';

import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './router.state';

export const getRouterState = createSelector(
  fromFeatureState.getState,
  (state: fromFeatureState.State) => state.router
);

const _getRouterStateUrl = (
  router: fromRouter.RouterReducerState<RouterStateUrl>
) => router && router.state && router.state.url;

export const getRouterNavigationParameter = createSelector(
  getRouterState,
  x => x.state.queryParams
);

export const getRouterStateUrl = createSelector(
  getRouterState,
  _getRouterStateUrl
);
