const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Task = require('../models/task');

// helpers for getting list of tasks
const getListTasksByUserId = async uid => {
  let tasksList;
  try {
    tasksList = await Task.find({ owner: uid });
  } catch (err) {
    const error = new HttpError(
      'Fetching tasks failed, please try again later.',
      500
    );
    throw error;
  }
  return tasksList;
};

// for checking existing user
const checkExistingUser = async uid => {
  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      'Fetching tasks failed, please try again later.',
      500
    );
    throw error;
  }

  if (!user) {
    const error = new HttpError('Could not find user specified id.', 404);
    throw error;
  }

  return user;
};

// for getting a list of tasks specified user ID (uid)
const getListTasks = async (req, res, next) => {
  // get userId from url params
  const userId = req.params.uid;

  let user;

  try {
    user = await checkExistingUser(userId);
  } catch (err) {
    return next(new HttpError('Could not find user specified id.', 404));
  }

  let userWithTasks;

  try {
    userWithTasks = await getListTasksByUserId(user.id);
  } catch (err) {
    return next(
      new HttpError('Fetching tasks failed, please try again later.', 500)
    );
  }

  if (userWithTasks.length === 0) {
    return next(new HttpError('Your list of tasks is empty.', 404));
  } else {
    res.status(200).json({
      tasks: userWithTasks.map(task => task.toObject({ getters: true })),
    });
  }
};

// for adding new task to the list
const addNewTask = async (req, res, next) => {
  const { title, userId } = req.body;

  if (!title) {
    return next(
      new HttpError('Please make sure to include title of a new task.', 422)
    );
  }

  let user;

  try {
    user = await checkExistingUser(userId);
  } catch (err) {
    return next(new HttpError('Could not find user specified id.', 404));
  }

  let createdNewTask;

  try {
    createdNewTask = new Task({
      title,
      completed: false,
      owner: user.id,
    });
  } catch (err) {
    console.log(err);
  }

  try {
    // create session - start session when we want to create a task
    const sess = await mongoose.startSession();
    sess.startTransaction();
    // task created w/t unique id and stored  on the current session
    await createdNewTask.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Adding task failed, please try again.', 500));
  }

  let userWithTasks;

  try {
    userWithTasks = await getListTasksByUserId(user.id);
  } catch (err) {
    return next(
      new HttpError('Fetching tasks failed, please try again later.', 500)
    );
  }

  res.status(201).json({
    message: 'New task created',
    task: createdNewTask,
    tasks: userWithTasks.map(task => task.toObject({ getters: true })),
  });
};

// for updating status of task specified task ID (tid)
const updateStatusTask = async (req, res, next) => {
  const { completed, userId } = req.body;
  // get taskId from url as params
  const taskId = req.params.tid;

  let user;

  try {
    // eslint-disable-next-line no-unused-vars
    user = await checkExistingUser(userId);
  } catch (err) {
    return next(new HttpError('Could not find user specified id.', 404));
  }

  let task;
  try {
    task = await Task.findByIdAndUpdate(
      { _id: taskId },
      { completed: completed },
      { new: true }
    );
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not update status of the specified task.',
        500
      )
    );
  }
  if (!task) {
    return next(new HttpError('Could not find task specified id.', 404));
  }

  res.status(200).json({
    message: 'Task updated successefully',
    task: task,
  });
};

// for deleting a task specified task ID (tid)
const deleteTaskById = async (req, res, next) => {
  const { userId } = req.body;
  const taskId = req.params.tid;

  let user;

  try {
    user = await checkExistingUser(userId);
  } catch (err) {
    return next(new HttpError('Could not find user specified id.', 404));
  }

  let task;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    try {
      task = await Task.findByIdAndDelete({ _id: taskId, owner: user.id });
    } catch (err) {
      return next(
        new HttpError(
          'Something went wrong, could not delete task specified id.',
          500
        )
      );
    }

    if (!task) {
      return next(new HttpError('Could not find task for specified id.', 404));
    }
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not delete task.', 500)
    );
  }

  res.status(200).json({
    message: 'Task deleted successfully',
    task: task,
  });
};

// for deleting a list of completed tasks
const deleteAllCompletedTasks = async (req, res, next) => {
  const { userId } = req.body;

  let user;

  try {
    user = await checkExistingUser(userId);
  } catch (err) {
    return next(new HttpError('Could not find user specified id.', 404));
  }

  let tasks;
  try {
    tasks = await Task.find({ completed: true });
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not delete completed tasks.',
        500
      )
    );
  }
  if (!tasks || tasks.length === 0) {
    return next(new HttpError('Could not find any completed tasks', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const idsToDelete = tasks.map(task => task._id);
    await Task.deleteMany({ _id: { $in: [...idsToDelete] } }).session(sess);
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete tasks.', 500)
    );
  }

  let userWithTasks;

  try {
    userWithTasks = await getListTasksByUserId(user.id);
  } catch (err) {
    return next(
      new HttpError('Fetching tasks failed, please try again later.', 500)
    );
  }

  res.status(200).json({
    message: 'Deleted tasks.',
    tasks: userWithTasks.map(task => task.toObject({ getters: true })),
  });
};

exports.getListTasks = getListTasks;
exports.addNewTask = addNewTask;
exports.updateStatusTask = updateStatusTask;
exports.deleteTaskById = deleteTaskById;
exports.deleteAllCompletedTasks = deleteAllCompletedTasks;
