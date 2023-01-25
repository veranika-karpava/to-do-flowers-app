const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidatorMail = require('mongoose-unique-validator');

const userSchema = new Schema({
  name: { type: String, require: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  tasks: [{ type: mongoose.Types.ObjectId, require: true, ref: 'Task' }],
});

// check unique user email
userSchema.plugin(uniqueValidatorMail);

module.exports = mongoose.model('User', userSchema);
