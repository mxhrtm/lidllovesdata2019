import { Component } from '@angular/core';
import { WebsocketSignalRService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lidl-Dashboard';

  constructor(private _websocketService: WebsocketSignalRService){
    // this._websocketService.startConnection();
    // this._websocketService.addActiveSapProductionOrderListener(); 
  }

}
