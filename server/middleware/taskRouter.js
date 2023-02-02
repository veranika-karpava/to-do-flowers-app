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
taskRouter.get('/:uid', getListTasks);

// add new task to the list of todos
taskRouter.post('/new', addNewTask);

// update status of task specified task ID (tid)
taskRouter.put('/:tid', updateStatusTask);

// delete a task specified task ID (tid)
taskRouter.delete('/:tid', deleteTaskById);

// delete a list of completed tasks
taskRouter.delete('/completed/true', deleteAllCompletedTasks);

module.exports = taskRouter;
