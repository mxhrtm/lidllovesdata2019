import { createSelector } from '@ngrx/store';
import { adapter } from './dashboard.state';
import * as fromFeatureState from '../resource-store.state';

import { RouterReducerState } from '@ngrx/router-store';

import { RouterSelectors } from '@app/root-store/app-store';
import { RouterState } from '@app/root-store/app-store/router';
import { Dashboard } from '@app/models/dashboard.model';

//State Selector
export const getDashboardState = createSelector(
  fromFeatureState.getState,
  (state: fromFeatureState.State) => state.Dashboard
);

//EntityAdapter Selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(getDashboardState);

export const getIds = selectIds;
export const getEntities = selectEntities;
export const getAll = selectAll;
export const getCount = selectTotal;

//Extended Selectors
export const getLoaded = createSelector(getDashboardState, state => state.loaded);
export const getError = createSelector(getDashboardState, state => state.error);

export const getSelected = createSelector(
  getEntities,
  RouterSelectors.getRouterState,
  (entities, router: RouterReducerState<RouterState.RouterStateUrl>):Dashboard => {
    return router && router.state && entities[router.state.params.DashboardId];
  }
);

