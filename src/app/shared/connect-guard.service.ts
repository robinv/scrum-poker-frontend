import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { WebSocketService } from '../scrum-poker/shared/web-socket.service';

@Injectable()
export class ConnectGuard implements CanActivate, CanActivateChild {

    constructor(
        private webSocketService: WebSocketService,
        private router: Router
    ) {}

    public canActivate(): boolean {
        if (this.webSocketService.isConnected()) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }

    public canActivateChild(): boolean {
        if (this.webSocketService.isConnected()) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }
}
