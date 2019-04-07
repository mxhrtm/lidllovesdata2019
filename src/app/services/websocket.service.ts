import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Store } from '@ngrx/store';
import { ResourceStore } from '@app/root-store';
import { Dashboard } from '@app/models/dashboard.model';

import { tap, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketSignalRService {
  constructor(private ResourceStore: Store<ResourceStore.State>) { }
  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:5001/Data')
                            .build();
    this.hubConnection
      .start()
      .then(() => {
        // this.populateStore();
        console.log('Connection started');
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  // public populateStore() {
  //   // Populate ActiveSapProductionOrder
  //   this.ResourceStore.dispatch(new AvailableSapProductionOrderActions.Load());
  //   this.ResourceStore.dispatch(new ActiveSapProductionOrderActions.Load());
  // }


  /*loadAndWait(): any {
     return this.ResourceStore.select(RollCarSelectors.getLoaded)
    .pipe(
      tap(loaded => {
        console.log('loaded1? ${loaded}');
        if (!loaded)
          this.ResourceStore.dispatch(new RollCarActions.Load());
      }),
      filter(loaded => {
        console.log('loaded? ${loaded}');
        
        return loaded;
      }),
      take(1)
    );
  }*/
}