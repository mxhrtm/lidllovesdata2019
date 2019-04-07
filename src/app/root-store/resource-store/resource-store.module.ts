//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './resource-store.reducer';
import { effects } from './resource-store.effects';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    
    StoreModule.forFeature('resource-store', reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [ ],
  providers: []
})
export class ResourceStoreModule {}
