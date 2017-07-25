export class User {
    private id: String;
    private name: String;

    constructor(id: String, name: String) {
        this.id = id;
        this.name = name;
    }

    public getId(): String {
        return this.id;
    }

    public getName(): String {
        return this.name;
    }
}
