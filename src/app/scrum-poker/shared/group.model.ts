import { Bet } from './bet.model';

export class Group {
    private _id: String;
    private _name: String;
    private _userId: String;
    private _isPokerActive: Boolean;
    private _bets: Bet[] = [];
    private _userIds: String[] = [];

    constructor(id: String, name: String, userId: String, isPokerActive: Boolean) {
        this._id = id;
        this._name = name;
        this._userId = userId;
        this._isPokerActive = isPokerActive;
    }

    get id(): String {
        return this._id;
    }

    get name(): String {
        return this._name;
    }

    get userId(): String {
        return this._userId;
    }

    get isPokerActive(): Boolean {
        return this._isPokerActive;
    }

    set isPokerActive(isPokerActive: Boolean) {
        this._isPokerActive = isPokerActive;
    }

    get bets(): Bet[] {
        return this._bets;
    }

    set bets(bets: Bet[]) {
        this._bets = bets;
    }

    get userIds(): String[] {
        return this._userIds;
    }

    set userIds(userIds: String[]) {
        this._userIds = userIds;
    }

    public addUserId(userId: String) {
        if (!this._userIds.includes(userId)) {
            this._userIds.push(userId);
        }
    }

    public addBet(bet: Bet) {
        this._bets.push(bet);
    }
}
