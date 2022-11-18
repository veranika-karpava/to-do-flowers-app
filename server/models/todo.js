const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const toDoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// create model
const ToDo = mongoose.model('ToDo', toDoSchema);


module.exports = ToDo;