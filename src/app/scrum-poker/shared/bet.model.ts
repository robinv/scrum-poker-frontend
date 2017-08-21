import { User } from './user.model';

export class Bet {
    private _user: User;
    private _bet: Number;

    constructor(user: User) {
        this._user = user;
    }

    get user(): User {
        return this._user;
    }

    get bet(): Number {
        return this._bet;
    }

    set bet(bet: Number) {
        this._bet = bet;
    }
}
