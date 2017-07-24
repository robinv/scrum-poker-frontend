import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private router: Router) {}

    public canActivate(): boolean {
        this.router.navigate(['scrum-poker/signup']);
        return false;
    }
}
