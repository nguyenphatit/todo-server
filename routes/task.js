const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const task = require('./../controllers/task');

router.get('/', task.getAll)
router.get('/:id', task.getById)
router.post('/', task.create)
router.patch('/:id', task.updateTask)
router.put('/:id', task.completeTask)
router.delete('/:id', task.deleteTask)

module.exports = router;