import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { UserListService } from './shared/user-list.service';

@Component({
    selector: 'app-scrum-poker',
    templateUrl: './scrum-poker.component.html'
})

export class ScrumPokerComponent implements OnDestroy, OnInit {
    constructor(
        public authService: AuthService,
        private userListService: UserListService
    ) {}

    public ngOnInit(): void {
        this._resetServices();
    }

    public ngOnDestroy(): void {
        this._resetServices();
    }

    private _resetServices(): void {
        this.authService.reset();
        this.userListService.reset();
    }
}
