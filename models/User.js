import { find } from 'lodash';

class User {
    constructor(users) {
        this.users = users? users : [];
    }

    fetchAll() {
        return this.users;
    }

    findUserByLoginNmae(loginName) {
        let user = find(this.users, function(o){ return o.login == loginName });
        if(user) {
            return user;
        } else {
            return {"user": "doesn't exist"}
        }
    }
}

export default User;