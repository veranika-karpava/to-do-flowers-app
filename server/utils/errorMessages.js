const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: "We couldn't find a user with that email. Please check again.",
    INVALID_PASSWORD: 'Oops! Incorrect password. Give it another try.',
    DUPLICATE_USERNAME: 'This username is already taken. Please choose a different one.',
    DUPLICATE_EMAIL: 'This email is already registered. You can log in or use a different one.',
    SIGNUP_FAILED: 'Something went wrong with the signup. Please try again later.',
    LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
    LOGOUT_SUCCESS: 'You’ve been logged out successfully.',
    NOT_FOUND_ID: "Sorry, we couldn't find the user with that ID.",
  },
  TOKEN: {
    NO_TOKEN: 'Authorization failed: No token provided.',
    TOKEN_FAILED: 'Authorization failed: Invalid or expired token. Please log in again.',
    NO_CONTENT: 'No token provided.',
  },
  VALIDATION: {
    REQUIRED_FIELDS: 'Oops! All required fields must be filled in.',
  },
  TASK: {
    EMPTY: 'Your task list is currently empty. Add something to get started!',
    FETCH_TASK: "We couldn't fetch your tasks right now. Please try again later.",
    REQUIRED_TASK: 'The title is required to create a new task.',
    ADD_TASK_FAIL: "Oops! We couldn't add your task. Please try again.",
    ADD_TASK_SUCCESS: 'Hooray! Your task has been added successfully!',
    NO_TASK: 'We couldn’t find a task with that ID. Please check and try again.',
    UPDATE_TASK_FAIL: "Oops! Something went wrong. We couldn't update the task status.",
    UPDATE_TASK_SUCCESS: 'Your task status has been updated successfully!',
    DELETE_TASK_FAIL: "Something went wrong. We couldn't delete the task. Please try again.",
    DELETE_TASK_SUCCESS: 'Task deleted successfully!',
    COMPLETED_TASKS: 'It looks like there are no completed tasks right now.',
    COUNT_TEXT: ' task(s) successfully deleted!',
    DELETE_COMPLETED: 'Oops! Something went wrong while deleting completed tasks.',
  },
  SERVER: {
    ROUTE_NOT_FOUND: "The page you're looking for doesn’t exist. Please check the URL.",
  },
};

module.exports = ERROR_MESSAGES;
