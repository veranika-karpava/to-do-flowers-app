const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Task = require('../models/task');

// get a list of todos specified user ID (uid)
const getListTasks = async (req, res, next) => {
    // get userId from url params
    const userId = req.params.uid;
    let userWithTasks;
    // get a list of tasks specified userId
    try {
        userWithTasks = await User.findById(userId).populate('tasks');
    } catch (err) {
        console.log(err)
        return next(new HttpError('Fetching tasks failed, please try again later.', 500));
    };

    if (!userWithTasks) {
        return next(new HttpError('Could not find user.', 404));
    } else if (userWithTasks.tasks.length === 0) {
        return next(new HttpError('Your list of tasks is empty.', 404));
    } else {
        res.status(200).json({ tasks: userWithTasks.tasks.map(task => task.toObject({ getters: true })) });
    }
};

// add new task to the list of todos
const addNewTask = async (req, res, next) => {
    // userId have to change to req.userData.userId after change front end side
    const { title, userId } = req.body
    if (!title) {
        return next(new HttpError('Please make sure to include input.', 422));
    };

    let createdNewTask;

    try {
        createdNewTask = new Task({
            title: title,
            completed: false,
            creator: userId
            // creator: req.userData.userId
        });
    } catch (err) { }

    //find user that created a new task in database
    let user;
    try {
        user = await User.findById(userId);
        // user = await User.findById(req.userData.userId);
    } catch (err) {
        return next(new HttpError('Adding task failed, please try again.', 500));
    }

    // check existing user
    if (!user) {
        return next(new HttpError('Could not find user.', 404));
    }

    try {
        // create session - start session when we want to create a place
        const sess = await mongoose.startSession();
        sess.startTransaction();

        // place created w/t unique id and stored  on the current session
        await createdNewTask.save({ session: sess });

        // grabs the created place id and adds it to the place field of the user.
        user.tasks.push(createdNewTask);

        // save in users collection
        await user.save({ session: sess });

        // the session commits the transactions
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError('Adding task failed, please try again.', 500));
    }

    res.status(201).json({ task: createdNewTask })
};

// update status of task specified task ID (tid)
const updateStatusTask = async (req, res, next) => {
    const { completed, userId } = req.body;
    // get taskId from url as params
    const taskId = req.params.tid;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        return next(new HttpError('Something went wrong, could not update status of the specified task', 500));
    };

    // check if this task belongs on this user
    // need change userId to req.userData.userId
    if (task.creator.toString() !== userId) {
        return next(new HttpError('You are not allowed to edit status of this task. ', 401));
    };

    task.completed = completed;

    try {
        await task.save();
    } catch (err) {
        return next(new HttpError('Something went wrong, could not update of the specified task.', 500));
    };

    res.status(200).json({ task: task.toObject({ getters: true }) })
};

// delete a task specified task ID (tid)
const deleteTask = async (req, res, next) => {

};

// delete a list of completed tasks
const deleteAllCompletedTasks = async (req, res, next) => {

};

exports.getListTasks = getListTasks;
exports.addNewTask = addNewTask;
exports.updateStatusTask = updateStatusTask;
exports.deleteTask = deleteTask;
exports.deleteAllCompletedTasks = deleteAllCompletedTasks;


// // get toDo name from data.json file
// app.get('/', async (_req, res) => {
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData)
// })

// // add new toDo to data.json file
// app.post('/', async (req, res) => {
//     const newToDo = new ToDo(req.body);
//     await newToDo.save();
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// })

// // update status of task in dataBase
// app.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { completed } = req.body
//     const updatedToDo = await ToDo.findByIdAndUpdate(id, { completed: completed }, { new: true });
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// })


// // delete one task
// app.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     const removedToDo = await ToDo.findByIdAndDelete(id);
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// })

// // delete all completed task from data.json
// app.delete('/', async (req, res) => {
//     const { id } = req.params;
//     const completedDeleteToDo = await ToDo.deleteMany({ completed: true });
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// }
// )