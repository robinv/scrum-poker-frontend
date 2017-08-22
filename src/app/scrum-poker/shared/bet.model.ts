export class Bet {
    private _userId: String;
    private _bet: Number;

    constructor(userId: String) {
        this._userId = userId;
    }

    get userId(): String {
        return this._userId;
    }

    get bet(): Number {
        return this._bet;
    }

    set bet(bet: Number) {
        this._bet = bet;
    }
}
