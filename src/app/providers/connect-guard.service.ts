import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class ConnectGuard implements CanActivate {

    constructor(public webSocketService: WebSocketService) {}

    canActivate(): boolean {
        return this.webSocketService.isConnected();
    }
}
