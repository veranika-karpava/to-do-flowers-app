const express = require('express');

// create router
const todosRouter = express.Router();

// get a list of todos
todosRouter.get('/user/:uid');

// add new todo to the list of todos
todosRouter.post('/');

// update status of task in dataBase
todosRouter.put('/:tid');


// delete one task
todosRouter.delete('/:tid');

// delete all completed task from data.json
todosRouter.delete('/completed');

module.exports = todosRouter;