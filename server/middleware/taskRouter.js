const express = require('express');

const {
  getListTasks,
  addNewTask,
  updateStatusTask,
  deleteTaskById,
  deleteAllCompletedTasks,
} = require('../services/tasksService');

const protect = require('../middleware/AuthMiddleware');

const taskRouter = express.Router();

taskRouter.use(protect);

// get a list of todos specified user ID (uid)
taskRouter.get('/', getListTasks);

// add new task to the list of todos
taskRouter.post('/new', addNewTask);

// update status of task specified task ID (tid)
taskRouter.put('/:tid([a-fA-F0-9]{24})?', updateStatusTask);

// delete a list of completed tasks
taskRouter.delete('/completed', deleteAllCompletedTasks);

// delete a task specified task ID (tid)
taskRouter.delete('/:tid([a-fA-F0-9]{24})', deleteTaskById);

module.exports = taskRouter;
