import { TestBed } from '@angular/core/testing';

import { WebsocketSignalRService } from './websocket.service';

describe('WebsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketSignalRService = TestBed.get(WebsocketSignalRService);
    expect(service).toBeTruthy();
  });
});
