import { User } from './user.model';

export class Group {
    private _id: String;
    private _name: String;
    private _userId: String;

    constructor(id: String, name: String, userId: String) {
        this._id = id;
        this._name = name;
        this._userId = userId;
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
}
