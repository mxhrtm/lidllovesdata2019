// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatCheckboxModule,
  MatCardModule
} from '@angular/material';

import { SharedComponentsModule } from './shared/shared-components.module';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { GenericSelectableTableComponent } from './generic-selectable-table/generic-selectable-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule
  ],
  entryComponents: [],
  declarations: [
    TestComponent,
    HomeComponent,
    GenericSelectableTableComponent
  ],
  exports: [
    SharedComponentsModule,
    TestComponent,
    HomeComponent,
    GenericSelectableTableComponent
  ],
  providers: []
})
export class AppComponentsModule {}
