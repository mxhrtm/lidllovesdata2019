import { Component, OnInit } from '@angular/core';

import { WebsocketSignalRService } from '@app/services';


@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    public signalRService: WebsocketSignalRService) { }

  ngOnInit() {
    this.signalRService.startConnection();
    // this.signalRService.addActiveSapProductionOrderListener();  
  }
}
