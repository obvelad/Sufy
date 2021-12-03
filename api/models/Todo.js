const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    placa: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;