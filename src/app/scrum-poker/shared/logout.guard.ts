import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class LogoutGuard implements CanActivate {

    public canActivate(): boolean {
        return true;
    }
}
