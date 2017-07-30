import { User } from './user.model';

export class Group {
    private _id: String;
    private _name: String;
    private _owner: User;

    constructor(id: String, name: String, owner: User) {
        this._id = id;
        this._name = name;
        this._owner = owner;
    }

    get id(): String {
        return this._id;
    }

    get name(): String {
        return this._name;
    }

    get owner(): User {
        return this._owner;
    }
}
