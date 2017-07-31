import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    public canActivate(): boolean {
        if (!this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['scrum-poker']);
        return false;
    }
}
