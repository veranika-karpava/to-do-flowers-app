const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidatorMail = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: { 
    type: String, 
    lowercase: true,
    unique: true,
    require: true,
  },
  email: { 
    type: String, 
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { 
    type: String,
    required: true, 
    minlength: 8,
    trim: true,
  },
});

// check unique user email
userSchema.plugin(uniqueValidatorMail);

module.exports = mongoose.model('User', userSchema);
