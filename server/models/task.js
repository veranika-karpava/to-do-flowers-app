const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  owner: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);
