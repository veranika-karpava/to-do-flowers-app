const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidatorMail = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
});

// check unique user email
userSchema.plugin(uniqueValidatorMail);

module.exports = mongoose.model('User', userSchema);
