import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { useUpdateTaskMutation, useDeleteTaskMutation } from '../../store/todosApiSlice.js';
import { updateToDo, deleteToDo } from '../../store/todos-slice.js';

import './TaskItem.scss';
import Button from '../Button/Button.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

const TaskItem = ({ task }) => {
  const { theme } = useSelector((state) => state.ui);
  const { id, title, completed } = task;
  const dispatch = useDispatch();

  const [updateTask, { isError: isUpdError, error: upderror }] = useUpdateTaskMutation();
  const [deleteTask, { isError: isDelError, error: delerror }] = useDeleteTaskMutation();

  const updateStatusHandler = async (id, status) => {
    try {
      const updTask = await updateTask({
        id,
        status: !status,
      }).unwrap();
      dispatch(updateToDo(updTask));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTaskHandler = async (id) => {
    try {
      const delTask = await deleteTask(id).unwrap();
      dispatch(deleteToDo(delTask));
    } catch (err) {
      console.log(err);
    }
  };

  const errorMessage = (isUpdError && upderror?.message) || (isDelError && delerror?.message);

  return (
    <li className={cn('tasks__item', { [theme]: theme })}>
      <div className="tasks__item-container">
        <Button
          variant="update"
          onClick={() => updateStatusHandler(id, completed)}
          icon={completed && 'AiOutlineCheck'}
          classNameIcon={cn('update', { 'icon-update': completed })}
        />
        <p
          className={cn('tasks__item-content', {
            [`completed-${theme}`]: completed,
          })}
        >
          {title}
        </p>
        {!completed && (
          <Button
            variant="delete"
            onClick={() => deleteTaskHandler(id)}
            icon="RxCross2"
            classNameIcon={cn('delete', 'icon-cross')}
          />
        )}
      </div>
      {errorMessage && <ErrorMessage errorText={errorMessage} variant="update" />}
    </li>
  );
};

export default TaskItem;
