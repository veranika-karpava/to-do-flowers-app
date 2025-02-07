const HttpError = require('../models/http-error');
const User = require('../models/user');
const Task = require('../models/task');

const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc Get tasks list specified user ID
// @route GET/tasks
// @access Private
const getListTasks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 404));
    }
    const tasksList = await Task.find({ owner: user.id }).sort({ createdAt: -1 });

    if (tasksList && tasksList.length === 0) {
      return res.status(200).json({ tasks: [] });
    }

    res.status(200).json({
      tasks: tasksList.map((task) => ({
        id: task._id,
        title: task.title,
        completed: task.completed,
      })),
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TASK.FETCH_TASK, 500));
  }
};

// @desc Add new task to the list
// @route POST/tasks/new
// @access Private
const addNewTask = async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return next(new HttpError(ERROR_MESSAGES.TASK.REQUIRED_TASK, 422));
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 404));
    }

    const createdNewTask = await Task.create({
      title,
      completed: false,
      owner: user.id,
    });
    res.status(201).json({
      message: ERROR_MESSAGES.TASK.ADD_TASK_SUCCESS,
      task: {
        id: createdNewTask._id,
        title: createdNewTask.title,
        completed: createdNewTask.completed,
      },
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TASK.ADD_TASK_FAIL, 500));
  }
};

// @desc Update status of the task specified ID
// @route PUT/tasks/:tid?
// @access Private
const updateStatusTask = async (req, res, next) => {
  const taskId = req.params.tid;
  const isCompleted = req.query.completed;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return next(new HttpError(ERROR_MESSAGES.TASK.NO_TASK, 404));
    }

    if (task.owner.toString() !== req.user.id) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 403));
    }

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId },
      { completed: isCompleted },
      { new: true },
    );

    res.status(200).json({
      message: ERROR_MESSAGES.TASK.UPDATE_TASK_SUCCESS,
      task: {
        id: updatedTask._id,
        title: updatedTask.title,
        completed: updatedTask.completed,
      },
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TASK.UPDATE_TASK_FAIL, 500));
  }
};

// @desc Delete task specified ID
// @route DELETE/tasks/:tid
// @access Private
const deleteTaskById = async (req, res, next) => {
  const taskId = req.params.tid;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 404));
    }

    const deletedTask = await Task.findByIdAndDelete({
      _id: taskId,
      owner: user.id,
    });

    if (!deletedTask) {
      return next(new HttpError(ERROR_MESSAGES.TASK.NO_TASK, 404));
    }

    res.status(200).json({
      message: ERROR_MESSAGES.TASK.DELETE_TASK_SUCCESS,
      task: {
        id: deletedTask._id,
        title: deletedTask.title,
        completed: deletedTask.completed,
      },
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TASK.DELETE_TASK_FAIL, 500));
  }
};

// @desc Delete tasks with status completed: true
// @route DELETE/tasks/completed
// @access Private
const deleteAllCompletedTasks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 404));
    }

    const tasksToDelete = await Task.find({ completed: true, owner: user.id });

    if (tasksToDelete && tasksToDelete.length === 0) {
      return next(new HttpError(ERROR_MESSAGES.TASK.COMPLETED_TASKS, 404));
    }

    const result = await Task.deleteMany({ completed: true, owner: user.id });

    res.status(200).json({
      message: `${result.deletedCount} ${ERROR_MESSAGES.TASK.COUNT_TEXT}`,
      tasks: tasksToDelete.map((task) => ({
        id: task._id,
        title: task.title,
        completed: task.completed,
      })),
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.TASK.DELETE_COMPLETED, 500));
  }
};

exports.getListTasks = getListTasks;
exports.addNewTask = addNewTask;
exports.updateStatusTask = updateStatusTask;
exports.deleteTaskById = deleteTaskById;
exports.deleteAllCompletedTasks = deleteAllCompletedTasks;
