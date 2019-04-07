import { NgModule } from '@angular/core';
import {} from '@angular/router';
import { CommonModule } from '@angular/common';

import { StoreModule, ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@environments/environment';


//MODULE/STORE
import { State } from './app-store/app-store.state';
import { ResourceStoreModule } from './resource-store/resource-store.module';
import { AppStoreModule } from './app-store/app-store.module';


export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export const metaReducers =
  !environment.production && environment.storeLogger ? [logger] : [];
//add to imports: StoreModule.forRoot(reducers, { metaReducers }),

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    CommonModule,

    //--Feature Store's

    //UtilsStoreModule,
    ResourceStoreModule,
    AppStoreModule,
    //------------------

    StoreModule.forRoot({}),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          //maxAge: 15
          /*serialize: {
            options: {
              Observable: false
            }
          }*/
        })
  ],
  providers: [],
  bootstrap: [],
  exports: []
})
export class RootStoreModule {}
