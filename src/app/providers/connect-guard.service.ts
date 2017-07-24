import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class ConnectGuard implements CanActivate, CanActivateChild {

    constructor(public webSocketService: WebSocketService) {}

    public canActivate(): boolean {
        return this.webSocketService.isConnected();
    }

    public canActivateChild(): boolean {
        return this.webSocketService.isConnected();
    }
}
