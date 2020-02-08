export class User {
    username: string;
    name: string;
    email: string;
    

    constructor(username: string, name: string, email: string) {
        this.username = username;
        this.email = email;
        this.name = name;
    }
}