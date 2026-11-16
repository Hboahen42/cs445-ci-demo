// LMS login with account lockout.
// REQ-9: after 3 consecutive failed logins, the account is locked.
//        A successful login before then resets the count.
const MAX_FAILED = 3;

class LMS {
  constructor() {
    this.users = new Map(); // username -> { password, failed, locked }
  }

  registerUser(username, password) {
    this.users.set(username, { password, failed: 0, locked: false });
  }

  login(username, password) {
    const user = this.users.get(username);
    if (!user || user.locked) return false;
    if (user.password === password) {
      user.failed = 0;
      return true;
    }
    user.failed += 1;
    if (user.failed >= MAX_FAILED) user.locked = true;
    return false;
  }

  isLocked(username) {
    const user = this.users.get(username);
    return user ? user.locked : false;
  }
}

module.exports = LMS;
