class HandleUsers {
  constructor() {
    this.users = [];
  }

  addUser(userId, socketId) {
    !this.users.some((u) => u.userId === userId) &&
      this.users.push({ userId, socketId });
  }
  removeUser(socketId) {
    this.users = this.users.filter((u) => u.socketId !== socketId);
  }
  getUser(userId) {
    return this.users.find((u) => u.userId === userId);
  }
}

module.exports = HandleUsers;
