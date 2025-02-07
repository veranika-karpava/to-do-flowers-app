# Flourish app
The Flourish app is a fully responsive, full-stack web application that allows users to manage theie tasks effectively. User can add/delete and update task statuses, as well as filter tasks based on current status. This app provides the option to switch between light/dark modes, and includes user authentication with JWT for secure login and sign-up.


# Current Features:
* Light/Dark Mode Toggle: switch between light and dark mode for better visual comfort;
* User Authentication: secure sign-up and login functionality with JWT tokens;
* Task Management: add new tasks, delete tasks, and update task statuses;
* Task Filtering: filter tasks by their status (All, Completed, Active);
* Task Cleanup: delete completed tasks to keep your task list organized.
* User Logout: log out and secure your account.

# Project Structure
* `/`: the login/sign-up page, where users can create an account or log in;
* `/tasks`: the main tasks management page where users create/update/delete tasks;

# Enviroment Variables
* set up the environment variables, make sure to configure both the client and server by following the instructions in the `.env.sample` file in both directories.

# Project Tech Stack
* Sass
* React
* Redux-Toolkit
* RTK Query
* React-router
* ESLint
* Prettier
* NodeJS
* ExpressJS
* MongoDB
* Mongoose
* JWT Authentication

# Running the Project
1. Clone or Download the Repository: clone the repository to your local machine;
2. Start the server:
   * **`cd server`**: navigate to the server directory;
   * **`npm install`**: install necessary dependencies;
   * **`npm start`**: start the server
3. Start the client:
   * **`cd client`**: navigate to the client directory;
   * **`npm install`**: install necessary dependencies;
   * **`npm start`** - launch the app in your browser;

# Link to the demo
* https://to-do-flowers-app.herokuapp.com/