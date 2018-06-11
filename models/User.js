class User {
    constructor(users) {
        this.users = users? users : [];
    }

    fetchAll() {
        return this.users;
    }
}

export default User;