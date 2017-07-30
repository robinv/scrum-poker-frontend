import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { WebSocketService } from './shared/web-socket.service';
import { UserListService } from './shared/user-list.service';
import { GroupListService } from './shared/group-list.service';

@Component({
    selector: 'app-scrum-poker',
    templateUrl: './scrum-poker.component.html',
    styleUrls: ['./scrum-poker.component.scss']
})

export class ScrumPokerComponent implements OnDestroy, OnInit {
    constructor(
        public authService: AuthService,
        public userListService: UserListService,
        private _groupListService: GroupListService,
        private _webSocketService: WebSocketService
    ) {}

    public ngOnInit(): void {
        this._webSocketService.connect();
        this.userListService.init();
        this._groupListService.init();
    }

    public ngOnDestroy(): void {
        this.resetServices();
    }

    public resetServices(): void {
        this._webSocketService.reset();
        this.userListService.reset();
        this._groupListService.reset();
    }
}
