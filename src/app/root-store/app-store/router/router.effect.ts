// ANGULAR
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// NGRX
import {
  RouterNavigationAction,
  ROUTER_NAVIGATION,
  ROUTER_CANCEL,
  ROUTER_ERROR,
  RouterAction
} from '@ngrx/router-store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// RXJS
import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

// MODULE
import * as RouterActions from './router.action';

// OTHER
import { RouterStateUrl } from './router.state';

@Injectable()
export class RouterEffects {
  private previousRouterNavigationAction: RouterNavigationAction<
    RouterStateUrl
  >;
  private currentRouterNavigationAction: RouterNavigationAction<RouterStateUrl>;

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(RouterActions.GO),
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(RouterActions.BACK),
    tap((action: RouterActions.Back) => {
      if (!this.previousRouterNavigationAction
        || this.previousRouterNavigationAction.payload
        && this.previousRouterNavigationAction.payload.routerState.url.indexOf('redirect') > -1) {
        action.payload.path[0] ? this.router.navigate(action.payload.path) : this.router.navigate(['/home']);
      } else {
        this.location.back();
      }
    })
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    tap(() => {
      this.location.forward();
    })
  );

  @Effect({ dispatch: false })
  save$: Observable<Action> = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    tap((action: RouterNavigationAction<RouterStateUrl>) => {
      this.previousRouterNavigationAction = this.currentRouterNavigationAction;
      this.currentRouterNavigationAction = { ...action };
    })
  );

  /* @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(ROUTER_CANCEL, ROUTER_ERROR),
    switchMap(action => of(this.previousRouterNavigationAction))
  );*/ 
}
