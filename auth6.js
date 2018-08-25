
const userList = [
    {
        id: 1,
        username: 'root',
        password: 'secret',
        user_info: 'Info isi user root',
        last_login: new Date('July 5 2018')
    },
    {
        id: 2,
        username: 'Kursi',
        password: 'bangku',
        user_info: 'Info isi user kursi',
        last_login: new Date('July 8 2012')
    }

]

class Auth {
    static login(obj) {
        const userToLog = userList.filter(val => val.username === obj.username)
        if ((this.logged === {} | !this.logged)) {
            if (userToLog[0].password === obj.password) {
                this.logged = userToLog[0]
            }
            else console.log('username or password is wrong');
        }
        else console.log('you are logged in as ',this.logged.username);
    }
    static validate(obj) {
        const userToLog = userList.filter(val => val.username === obj.username)
        return (userToLog[0].password === obj.password)
    }
    static logout() {
        userList[this.logged.id - 1].last_login = new Date;

        this.logged = {};
    }
    static user() {
        if (this.logged !== {} && this.logged) console.log(this.logged);
        else console.log('must be logged in');

    }
    static id() {
        if (this.logged !== {} && this.logged) console.log(this.logged.id);
        else console.log('must be logged in');
    }
    static check() {
        return (this.logged || false);
    }
    static guest() {
        return !(this.logged || false);
    }
    static lastLogin() {
        if (this.logged !== {} && this.logged) console.log(this.logged.last_login);
        else console.log('must be logged in');
    }
}

Auth.login({ username: 'Kursi', password: 'bangku' })      // If valid, user will log in.

console.log(Auth.validate({ username: 'root', password: 'secret' }))   // Just verify username and password without log in.

// Auth.logout()          // Log out the current logged in user.

// Auth.login({ username: 'Kursi', password: 'bangku' })  

Auth.user()            // Get information about current logged in user.

Auth.id()              // Get the User ID.

Auth.check()           // Will returns true if user already logged in.

Auth.guest()           // Will returns true if user not logged in.

Auth.lastLogin()       // Get information when the user last logged in.