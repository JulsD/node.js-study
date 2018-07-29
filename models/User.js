import { find } from 'lodash';

class User {
    constructor(users) {
        this.users = users? users : [];
    }

    fetchAll() {
        return this.users;
    }

    findUser(data) {
        let user = find(this.users, data);
        if(user) {
            return user;
        } else {
            return null;
        }
    }

    findOrCreateUser(data) {
        let user = find(this.users, data);
        if(user) {
            return user;
        } else {
            this.users.push(data);
            return data;
        }
    }
}

export default User;