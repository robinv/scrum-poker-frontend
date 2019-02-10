import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { WebSocketService } from './shared/web-socket.service';
import { UserService } from './shared/user.service';
import { GroupService } from './shared/group.service';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-scrum-poker',
    templateUrl: './scrum-poker.component.html',
    styleUrls: ['./scrum-poker.component.scss']
})

export class ScrumPokerComponent implements OnDestroy, OnInit {
    private _destroySubject = new Subject();

    public isLoading: Boolean = false;

    constructor(
        public authService: AuthService,
        public userService: UserService,
        private _groupListService: GroupService,
        private _webSocketService: WebSocketService,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    public ngOnInit(): void {
        this.isLoading = true;

        this._webSocketService
            .connect()
            .subscribe(() => {
                const userListInit = this.userService.init();
                const groupListInit = this._groupListService.init();

                forkJoin([userListInit, groupListInit])
                    .subscribe(() => {
                        this.onLoadingFinished();
                    });
            }, () => {
                this.authService.reset();
                this._resetServices();
                this._router.navigate(['']);
            });
    }

    private onLoadingFinished(): void {
        this.isLoading = false;

        this._webSocketService
            .getObservable('group.poker.started')
            .pipe(
                takeUntil(this._destroySubject)
            )
            .subscribe(item => {
                const group = this._groupListService.getById(item.id);
                if (group) {
                    this._snackBar.open(
                        `Scrum Poker started in group "${group.name}"`,
                        null,
                        {
                            duration: 2000
                        }
                    );
                }
            });

        this._webSocketService
            .getObservable('group.poker.ended')
            .pipe(
                takeUntil(this._destroySubject)
            )
            .subscribe(item => {
                const group = this._groupListService.getById(item.id);
                if (group) {
                    this._snackBar.open(
                        `Scrum Poker ended in group "${group.name}"`,
                        null,
                        {
                            duration: 2000
                        }
                    );
                }
            });
    }

    public ngOnDestroy(): void {
        this._resetServices();
        this._destroySubject.next();
        this._destroySubject.complete();
    }

    private _resetServices(): void {
        this._webSocketService.reset();
        this.userService.reset();
        this._groupListService.reset();
    }
}
