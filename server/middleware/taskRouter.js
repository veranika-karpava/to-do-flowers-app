const express = require('express');

const {
  getListTasks,
  addNewTask,
  updateStatusTask,
  deleteTaskById,
  deleteAllCompletedTasks,
} = require('../services/tasksService');
// create router
const taskRouter = express.Router();

// get a list of todos specified user ID (uid)
taskRouter.get('/user/:uid', getListTasks);

// add new task to the list of todos
taskRouter.post('/', addNewTask);

// update status of task specified task ID (tid)
taskRouter.put('/:tid', updateStatusTask);

// delete a task specified task ID (tid)
taskRouter.delete('/task/:tid', deleteTaskById);

// delete a list of completed tasks
taskRouter.delete('/completed', deleteAllCompletedTasks);

module.exports = taskRouter;
