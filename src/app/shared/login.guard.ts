import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivateChild {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    public canActivateChild(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
