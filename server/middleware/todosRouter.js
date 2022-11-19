const express = require('express');

// create router
const todosRouter = express.Router();

// get a list of todos specified user ID (uid)
todosRouter.get('/user/:uid');

// add new task to the list of todos
todosRouter.post('/');

// update status of task specified task ID (tid)
todosRouter.put('/:tid');

// delete a task specified task ID (tid)
todosRouter.delete('/:tid');

// delete a list of completed tasks
todosRouter.delete('/completed');

export default todosRouter;