import { User } from './user.model';

export class OwnUser extends User {
    private _groupIds: String[] = [];

    constructor(id: String, name: String) {
        super(id, name);
    }

    get groupIds(): String[] {
        return this._groupIds;
    }

    set groupIds(id: String[]) {
        this._groupIds = id;
    }

    public addGroupId(id: String) {
        this._groupIds.push(id);
    }
}
