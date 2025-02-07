// Validation type
export const VALIDATION_TYPE = {
  REQUIRE: 'REQUIRE',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
};

// Theme Modes
export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Auth Modes
export const AUTH_MODE = {
  LOGIN: 'Log in',
  SIGNUP: 'Sign up',
};

export const AUTH_TITLE = {
  LOGIN: 'Log in to Continue',
  SIGNUP: 'Create Your Account',
};

export const AUTH_TEXT = {
  LOGIN: 'Already have an account?',
  SIGNUP: "New here? Let's get you started!",
};

export const AUTH_INPUT = {
  USERNAME: 'Username',
  EMAIL: 'Email',
  PASSWORD: 'Password',
};

export const AUTH_ERROR_TEXT = {
  USERNAME: 'Please provide a username',
  EMAIL: 'Please provide a valid email address example@example.com',
  PASSWORD:
    'Your password needs at least 8 characters, a letter, and a number. Let’s make it strong!',
};

export const TASK_INPUT = {
  TITLE: 'task',
  PLACEHOLDER: 'Add a new task... get things done!',
};

export const EMPTY_LIST = {
  TEXT: 'Your task list is looking a little empty—let’s add some tasks!',
};

export const ITEMS_LEFT = {
  TEXT: 'items left',
};

export const BUTTON_LABELS = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  CLEAR: 'Clear Completed',
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

export const FILTER_TERMS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const HEADER_TITLE = {
  LOGIN: 'Welcome, ',
  SIGNUP: 'Flourish',
};

export const FOOTER_TITLE = {
  RIGHT: 'Created with',
  LEFT: 'by Veranika Karpava © 2022-',
};

// Footer Dynamic Year
export const CURRENT_YEAR = new Date().getFullYear();
export const FOOTER_COPYRIGHT = `${FOOTER_TITLE.LEFT}${CURRENT_YEAR}`;

//urls
export const PATH_API = {
  TASKS_URL: '/tasks',
  QUOTE_URL: '/quote',
  USERS_URL: '/user',
};
