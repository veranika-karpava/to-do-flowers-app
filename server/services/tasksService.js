const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Task = require('../models/task');

// for getting a list of tasks specified user ID (uid)
const getListTasks = async (req, res, next) => {
  // get userId from url params
  const userId = req.params.uid;
  let userWithTasks;

  try {
    userWithTasks = await User.findById(userId).populate('tasks');
  } catch (err) {
    return next(
      new HttpError('Fetching tasks failed, please try again later.', 500)
    );
  }

  if (!userWithTasks) {
    return next(new HttpError('Could not find user specified id.', 404));
  } else if (userWithTasks.tasks.length === 0) {
    return next(new HttpError('Your list of tasks is empty.', 404));
  } else {
    res
      .status(200)
      .json({
        tasks: userWithTasks.tasks.map(task =>
          task.toObject({ getters: true })
        ),
      });
  }
};

// for adding new task to the list
const addNewTask = async (req, res, next) => {
  // userId have to change to req.userData.userId after change front end side
  const { title, userId } = req.body;
  if (!title) {
    return next(
      new HttpError('Please make sure to include title of a new task.', 422)
    );
  }

  let createdNewTask;

  try {
    createdNewTask = new Task({
      title,
      completed: false,
    });
  } catch (err) {
    console.log(err);
  }

  let user;
  try {
    user = await User.findById(userId);
    // user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(new HttpError('Adding task failed, please try again.', 500));
  }

  // check existing user
  if (!user) {
    return next(new HttpError('Could not find user specified id.', 404));
  }

  try {
    // create session - start session when we want to create a task
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // task created w/t unique id and stored  on the current session
    await createdNewTask.save({ session: sess });

    // grabs the created task id and adds it to the tasks field of the user.
    user.tasks.push(createdNewTask);

    // save in users collection
    await user.save({ session: sess });

    // the session commits the transactions
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Adding task failed, please try again.', 500));
  }

  res.status(201).json({ task: createdNewTask });
};

// for updating status of task specified task ID (tid)
const updateStatusTask = async (req, res, next) => {
  const { completed } = req.body;
  // get taskId from url as params
  const taskId = req.params.tid;

  let task;
  try {
    task = await Task.findById(taskId);
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
  task.completed = completed;

  try {
    await task.save();
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not update of the specified task.',
        500
      )
    );
  }

  res.status(200).json({ task: task.toObject({ getters: true }) });
};

// for deleting a task specified task ID (tid)
const deleteTaskById = async (req, res, next) => {
  // change userId to req.userData.userId and in router as well
  const { userId } = req.body;
  const taskId = req.params.tid;
  let task;

  try {
    task = await Task.findById(taskId);
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

  let user;
  try {
    user = await User.findById(userId);
    // user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not delete task specified id.',
        500
      )
    );
  }
  // check existing user
  if (!user) {
    return next(new HttpError('Could not find user specified id.', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Task.findOneAndDelete({ id: task._id }, { session: sess });
    await user.tasks.pull(task._id);
    await user.save({ session: sess });
    // const userUpdateResults = await User.findOneAndUpdate(
    //     { _id: user._id },
    //     { $pull: { tasks: { $in: [task._id] } } },
    //     { new: true, session: sess }
    // );
    // await userUpdateResults.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not delete task.', 500)
    );
  }
  res.status(200).json({ message: 'Deleted task.' });
};

// for deleting a list of completed tasks
const deleteAllCompletedTasks = async (req, res, next) => {
  const { userId } = req.body;
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

  let user;
  try {
    user = await User.findById(userId);
    // user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not delete completed tasks.',
        500
      )
    );
  }
  // check existing user
  if (!user) {
    return next(new HttpError('Could not find user.', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const idsToDelete = tasks.map(task => task._id);
    await Task.deleteMany({ _id: { $in: [...idsToDelete] } }).session(sess);
    idsToDelete.forEach(async id => {
      try {
        await user.tasks.pull(id);
      } catch (err) {
        console.log(err);
      }
    });
    await user.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete tasks.', 500)
    );
  }

  res.status(200).json({ message: 'Deleted tasks.' });
};

exports.getListTasks = getListTasks;
exports.addNewTask = addNewTask;
exports.updateStatusTask = updateStatusTask;
exports.deleteTaskById = deleteTaskById;
exports.deleteAllCompletedTasks = deleteAllCompletedTasks;
