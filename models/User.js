const bcrypt = require('bcryptjs');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

module.exports = User;
