import 'rxjs/add/observable/forkJoin'

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { WebSocketService } from './shared/web-socket.service';
import { UserService } from './shared/user.service';
import { GroupService } from './shared/group.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-scrum-poker',
    templateUrl: './scrum-poker.component.html',
    styleUrls: ['./scrum-poker.component.scss']
})

export class ScrumPokerComponent implements OnDestroy, OnInit {
    public isLoading: Boolean = false;

    constructor(
        public authService: AuthService,
        public userService: UserService,
        private _groupListService: GroupService,
        private _webSocketService: WebSocketService,
        private _router: Router
    ) {}

    public ngOnInit(): void {
        this.isLoading = true;

        this._webSocketService
            .connect()
            .subscribe(() => {
                const userListInit = this.userService.init();
                const groupListInit = this._groupListService.init();

                Observable.forkJoin(userListInit, groupListInit)
                    .subscribe((a) => {
                        this.isLoading = false;
                    });
            }, () => {
                this.authService.reset();
                this._resetServices();
                this._router.navigate(['']);
            });
    }

    public ngOnDestroy(): void {
        this._resetServices();
    }

    private _resetServices(): void {
        this._webSocketService.reset();
        this.userService.reset();
        this._groupListService.reset();
    }
}
