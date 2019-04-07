//ANGULAR
import { Injectable } from '@angular/core';

//NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';

//RXJS
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

//MODULE

//MODULE/STORE
import * as fromActions from './dashboard.action';
import { Dashboard } from '@app/models/dashboard.model';
import { ResourceService } from '@app/services';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private _resourceServices: ResourceService
  ) {}

  // @Effect()
  // loadDashboards$ = this.actions$.pipe(
  //   ofType(fromActions.LOAD),
  //   switchMap((action: fromActions.Load) => {
  //     return this._resourceServices.getDashboards().pipe(
  //       map((Dashboard: Dashboard[]) => new fromActions.LoadSuccess(Dashboard)),
  //       catchError(error => of(new fromActions.LoadFail(error)))
  //     );
  //   })
  // );

  // @Effect()
  // updateDashboard$ = this.actions$.pipe(
  //   ofType(fromActions.UPDATE),
  //   map((action: fromActions.Update) => {
  //     return action.payload;
  //   }),
  //   switchMap((payload: Update<Dashboard>) => {
  //     return this._resourceServices.updateDashboard(payload.changes, payload.id).pipe(
  //       map((Dashboard: Dashboard) => {
  //         let payload = {
  //           id: Dashboard.id,
  //           changes: Dashboard
  //         };

  //         return new fromActions.UpdateSuccess(payload);
  //       }),
  //       catchError((error: Error) => of(new fromActions.UpdateFail(error)))
  //     );
  //   })
  // );
}
