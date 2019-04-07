import { createFeatureSelector } from '@ngrx/store';

import { DashboardState } from './dashboard';


export interface State {
  Dashboard: DashboardState.State
}


export const getState = createFeatureSelector<State>(
  'resource-store'
);