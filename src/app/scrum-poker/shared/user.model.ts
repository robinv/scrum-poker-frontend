export class User {
    private _id: String;
    private _name: String;

    constructor(id: String, name: String) {
        this._id = id;
        this._name = name;
    }

    get id(): String {
        return this._id;
    }
    get name(): String {
        return this._name;
    }
}
