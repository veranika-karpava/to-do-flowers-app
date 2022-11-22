const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const taskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    creator: { type: mongoose.Types.ObjectId, require: true, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
