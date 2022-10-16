const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

    task: {
        type: String,
        required: true
    },
    done: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('todos', todoSchema)