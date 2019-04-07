// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// OTHER
import { DashboardPage } from './dashboard.page';
import { SharedComponentsModule } from '@app/components/shared/shared-components.module';
import { MatButtonModule, MatListModule,  MatIconModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatAutocompleteModule, MatInputModule, MatCard, MatCardModule, MatTableModule } from '@angular/material';
import { AppComponentsModule } from '@app/components/app-components.module';
import {ChartModule} from 'primeng/chart'
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routs: Routes = [
  { path: '', component: DashboardPage }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routs),
    SharedComponentsModule,
    MatButtonModule,
    AppComponentsModule,
    ChartModule,
    MatIconModule,
    MatFormFieldModule, 
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    OverlayPanelModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule
  ],
  declarations: [DashboardPage]
})
export class DashboardModule { }
