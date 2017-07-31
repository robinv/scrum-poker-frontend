export class User {
    private _id: String;
    private _name: String;
    private _online: Boolean;

    constructor(id: String, name: String) {
        this._id = id;
        this._name = name;
        this._online = false;
    }

    get id(): String {
        return this._id;
    }
    get name(): String {
        return this._name;
    }

    get online(): Boolean {
        return this._online;
    }

    set online(online: Boolean) {
        this._online = online;
    }
}
