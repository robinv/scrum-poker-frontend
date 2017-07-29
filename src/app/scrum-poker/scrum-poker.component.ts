import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-scrum-poker',
    templateUrl: './scrum-poker.component.html'
})

export class ScrumPokerComponent implements OnDestroy, OnInit {
    constructor(
        public authService: AuthService,
        private router: Router
    ) {}

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

    public logout() {
        this.authService.reset();
        this.router.navigate(['']);
    }
}
