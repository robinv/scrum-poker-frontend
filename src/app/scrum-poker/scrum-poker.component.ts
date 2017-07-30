import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { WebSocketService } from './shared/web-socket.service';
import { UserListService } from './shared/user-list.service';

@Component({
    selector: 'app-scrum-poker',
    templateUrl: './scrum-poker.component.html'
})

export class ScrumPokerComponent implements OnDestroy, OnInit {
    constructor(
        public authService: AuthService,
        private _webSocketService: WebSocketService,
        private _userListService: UserListService,
        private _router: Router,
    ) {}

    public ngOnInit(): void {
        this._webSocketService.connect();
        this._userListService.init();
    }

    public ngOnDestroy(): void {
        this.resetServices();
    }

    public resetServices(): void {
        this._webSocketService.reset();
        this._userListService.reset();
    }
}
