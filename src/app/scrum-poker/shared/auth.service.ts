import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Resettable } from '../../shared/reset.interface';

@Injectable()
export class AuthService implements Resettable {
    private _user: User;

    constructor() {}

    get user(): User {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    public isLoggedIn(): Boolean {
        if (!this._user) {
            return false;
        }
        return true;
    }

    reset(): void {
        delete this._user;
    }


}
