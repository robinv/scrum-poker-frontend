import { Injectable } from '@angular/core';
import { Resettable } from './resettable.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements Resettable {
    private _token: String;
    private _decodedToken: any;
    private _userId: String;
    private _jwtHelper: JwtHelperService;

    constructor(
        private router: Router
    ) {
        this._jwtHelper = new JwtHelperService();
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

    get userId(): String {
        return this._userId;
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
        this._userId = this._decodedToken.id;
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
        this._userId = undefined;
    }
}
