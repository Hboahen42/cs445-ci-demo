// Password rules for the LMS.
// REQ-6: a password must be 8-20 characters long.
// REQ-7 (new): a password must also contain at least one digit.

function isValidPasswordLength(p) {
  return p.length >= 8 && p.length <= 20;
}

function hasDigit(p) {
  return /\d/.test(p);
}

function isValidPassword(p) {
  return isValidPasswordLength(p) && hasDigit(p);
}

module.exports = { isValidPasswordLength, hasDigit, isValidPassword };
