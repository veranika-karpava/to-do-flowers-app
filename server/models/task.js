const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    owner: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Task', taskSchema);
