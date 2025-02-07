import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setTodoList: (state, action) => {
      if (action.payload.length === 0) {
        state.tasks = [];
      } else {
        state.tasks = [...action.payload];
      }
    },
    createNewToDo: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    updateToDo: (state, action) => {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return { ...task, completed: updatedTask.completed };
        }
        return task;
      });
    },
    deleteToDo: (state, action) => {
      const deletedTask = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== deletedTask.id);
    },
    deleteCompletedToDos: (state, action) => {
      const deletedTasks = action.payload;
      state.tasks = state.tasks.filter((task) => !deletedTasks.some((del) => del.id === task.id));
    },
  },
});

export const selectActiveCount = (state) =>
  state.todos.tasks.filter((task) => !task.completed).length;

export const selectCompletedCount = (state) =>
  state.todos.tasks.filter((task) => task.completed).length;

export const { setTodoList, createNewToDo, updateToDo, deleteToDo, deleteCompletedToDos } =
  todosSlice.actions;

export default todosSlice;
