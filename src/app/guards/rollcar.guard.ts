import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { ResourceStore, DashboardSelectors, DashboardActions} from '../root-store';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class DashboardGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private store: Store<ResourceStore.State>
  ) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => {
        return of(true);
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkStore().pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
  checkStore(): Observable<any> {
    return combineLatest(
      this.store.select(DashboardSelectors.getLoaded),
      this.store.select(DashboardSelectors.getError)
    ).pipe(
      tap(combine => {
        if (!combine[0] && !combine[1])
          this.store.dispatch(new DashboardActions.Load());
      }),
      filter(combine => {
        if (combine[1] != '') throw 'no data';
        return combine[0];
      }),
      take(1)
    );
  }
}
