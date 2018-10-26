const gravatar = require('gravatar');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateTaskInput = require('../validation/task');
const isFutureDate = require('./../validation/futureDate');
const User = require('./../models/User');
const Task = require('./../models/Task');

exports.getAll = (req, res, next) => {
    Task.find({})
        .then(tasks => {
            if (tasks) {
                res.status(200).json(tasks)
            } else {
                return res.status(400).json({ message: 'No task' })
            }
        })
}

exports.getById = (req, res, next) => {
    Task.findById({ _id: req.params.id })
        .then(task => {
            if (task) {
                res.status(200).json(task)
            } else {
                return res.status(400).json({ message: 'Not found' })
            }
        })
}

exports.create = (req, res, next) => {
    const { errors, isValid } = validateTaskInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        if (isFutureDate(req.body.deadline)) {
            User.findById({ _id: req.body.user })
                .then(user => {
                    if (user) {
                        const newTask = new Task({
                            _id: new mongoose.Types.ObjectId(),
                            title: req.body.title,
                            user: user,
                            priority: req.body.priority,
                            createdDate: new Date(),
                            deadline: req.body.deadline,
                            content: req.body.content,
                            completed: false
                        })
                        newTask.save().then(task => res.status(201).json(task))
                    }
                })
        } else {
            res.status(400).json({ errors: 'Deadline only accepts the current or future dates' })
        }
    }
}

exports.updateTask = (req, res, next) => {
    const id = req.params.id;
    Task.updateOne({ _id: id }, { $set: { title: req.body.title, deadline: req.body.deadline, content: req.body.content, priority: req.body.priority } })
        .then(result => {
            if (result) {
                Task.findById({ _id: id })
                    .then(task => res.status(200).json(task))
            } else {
                return res.status(400).json({ errors: 'Error' })
            }
        })
}

exports.deleteTask = (req, res, next) => {
    const id = req.params.id
    Task.findOneAndDelete({ _id: id })
        .then(result => res.status(200).json(result))
}

exports.completeTask = (req, res, next) => {
    const id = req.params.id;
    Task.updateOne({ _id: id }, { $set: { completed: req.body.complete } })
        .then(result => {
            if (result) {
                Task.findById({ _id: id })
                    .then(task => res.status(200).json(task))
            } else {
                return res.status(400).json({ errors: 'Error' })
            }
        })
}