import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppComponentsModule } from './components/app-components.module';

import * as fromServices from './services';
import { AppContainersModule } from './containers/app-containers.module';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './root-store/app-store/router/router.state';
import { AppRoutingModule } from './app.router';
import { RootStoreModule } from './root-store/root-store.module';
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardGuard } from './guards/rollcar.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppComponentsModule,
    AppContainersModule,
    AppRoutingModule,
    RootStoreModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    ...fromServices.services,
    DashboardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
