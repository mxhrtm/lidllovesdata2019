import { ActionReducerMap, createSelector } from '@ngrx/store';
import { State } from './app-store.state';



//import * as fromUi from './ui';
import * as fromRouter from './router';
import { Params } from '@angular/router';


export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  data: any;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.reducer
};