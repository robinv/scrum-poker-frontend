import { Injectable } from '@angular/core';
import { Resettable } from './resettable.interface';
import { User } from '../scrum-poker/shared/user.model';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements Resettable {
    private _token: String;
    private _decodedToken: any;
    private _user: User;
    private _jwtHelper: JwtHelper;

    constructor(
        private router: Router
    ) {
        this._jwtHelper = new JwtHelper();
        const storageToken = localStorage.getItem('token');

        if (storageToken) {
            try {
                this.token = storageToken;
            } catch(error) {
                this.reset();
                this.router.navigate(['']);
            }
        }
    }

    get user(): User {
        return this._user;
    }

    get token(): String {
        if (this._jwtHelper.isTokenExpired(this._token.toString())) {
            this.reset();
            this.router.navigate(['']);
        }
        return this._token;
    }

    set token(token: String) {
        if (this._jwtHelper.isTokenExpired(token.toString())) {
            throw new Error('token is expired');
        }

        const decodedToken = this._jwtHelper.decodeToken(token.toString());

        localStorage.setItem('token', token.toString());
        this._decodedToken = decodedToken;
        this._user = new User(this._decodedToken.id, this._decodedToken.name);
        this._token = token;
    }

    public isLoggedIn(): Boolean {
        if (!this._token) {
            return false;
        }
        return true;
    }

    public reset(): void {
        localStorage.removeItem('token');
        this._token = undefined;
        this._decodedToken = undefined;
        this._user = undefined;
    }
}
