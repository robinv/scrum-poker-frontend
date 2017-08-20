export class Group {
    private _id: String;
    private _name: String;
    private _userId: String;
    private _isPokerActive: Boolean;

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
}
