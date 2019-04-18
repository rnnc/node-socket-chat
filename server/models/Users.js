module.exports = class Users {
  constructor(users) {
    this.users = [];
    if (users && Array.isArray(users))
      initUsers(users);
  }

  initUsers() {
    
  }

  addUser(user, socketId) {


    if (this.users.some(_user => _user.username === user.username))
      throw "USERNAME_EXISTS";

    const u = {
      ...user,
      socketId,
      joinedChat: new Date().toISOString()
    }

    this.users.push(u);

    return u;
  }

  removeUser(username, socketId) {

    // destructive, without returning user
    const user = this.getUser(username, socketId);

    if (socketId)
      this.user = this.user.filter(user => user.socketId !== socketId);
    else if (username)
      this.user = this.user.filter(user => user.username !== username);

    return user;

  }

  getUser(username, socketId) {
    let user;

    if (socketId)
      user = this.users.find(_user => _user.socketId === socketId)
    else if (username)
      user = this.users.find(_user => _user.username === username)

    if (!user)
      throw "USER_NOT_FOUND";

    return user;
  }

  get userList() {
    return this.users;
  }

}