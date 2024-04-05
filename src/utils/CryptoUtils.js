const bcrypt = require("bcryptjs");

export function hash(text) {
  return bcrypt.hashSync(text, bcrypt.genSaltSync());
}
