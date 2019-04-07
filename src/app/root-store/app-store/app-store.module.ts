//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './app-store.reducer';
import { effects } from './app-store.effects';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    StoreModule.forFeature('app-store', reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [ ],
  providers: []
})
export class AppStoreModule {}
