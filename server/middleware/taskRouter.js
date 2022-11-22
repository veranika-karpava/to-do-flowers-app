const express = require('express');

const tasksService = require('../services/tasksService');
// create router
const taskRouter = express.Router();

// get a list of todos specified user ID (uid)
taskRouter.get('/user/:uid', tasksService.getListTasks);

// add new task to the list of todos
taskRouter.post('/', tasksService.addNewTask);

// update status of task specified task ID (tid)
taskRouter.put('/:tid', tasksService.updateStatusTask);

// delete a task specified task ID (tid)
taskRouter.delete('/user/:uid/:tid', tasksService.deleteTaskById);

// delete a list of completed tasks
taskRouter.delete('/completed', tasksService.deleteAllCompletedTasks);

module.exports = taskRouter;