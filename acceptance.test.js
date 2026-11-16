const LMS = require('./lms');

// UC-2 Log In. REQ-9: lock the account after
// 3 consecutive failed logins.
describe('UC-2 Log In: REQ-9 lockout', () => {
  let lms;
  beforeEach(() => {
    lms = new LMS();
    // Given a registered student
    lms.registerUser('student01', 'Pass123!');
  });

  test('AC-1: 3 wrong passwords lock it', () => {
    // When: 3 wrong passwords in a row
    for (let i = 0; i < 3; i++) {
      lms.login('student01', 'wrong');
    }
    // Then: even the right password fails
    expect(lms.isLocked('student01')).toBe(true);
    expect(lms.login('student01', 'Pass123!'))
      .toBe(false);
  });

  test('AC-2: 2 wrong passwords do not lock', () => {
    lms.login('student01', 'wrong');
    lms.login('student01', 'wrong');
    expect(lms.login('student01', 'Pass123!'))
      .toBe(true);
  });

  test('AC-3: a success resets the count', () => {
    lms.login('student01', 'wrong');
    lms.login('student01', 'wrong');
    lms.login('student01', 'Pass123!'); // reset
    lms.login('student01', 'wrong');
    expect(lms.isLocked('student01')).toBe(false);
  });
});
