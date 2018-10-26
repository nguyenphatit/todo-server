const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    user: { type: Object, ref: 'User' },
    priority: { type: String },
    createdDate: { type: Date },
    deadline: { type: Date },
    content: { type: String },
    completed: { type: Boolean }
});

const Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;