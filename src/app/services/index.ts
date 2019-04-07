import { WebsocketSignalRService } from './websocket.service';
import { ResourceService } from './resource.service';
import { TimerService } from './timer.service';


export const services: any[] = [
    WebsocketSignalRService,
    ResourceService,
    TimerService
];

export * from './websocket.service';
export * from './resource.service';
export * from './timer.service';
