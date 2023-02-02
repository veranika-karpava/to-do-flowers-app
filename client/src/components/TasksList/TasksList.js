import React, { useContext } from 'react';

import TaskItem from '../TaskItem/TaskItem';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import './TasksList.scss';

const TasksList = ({ onDeleteHandler, onCompletedHandler, filteredTasks }) => {
  const theme = useContext(ThemeContext);

  return (
    <ul className={`tasks__list tasks__list--${theme.theme}`}>
      {filteredTasks.map(task => {
        return (
          <TaskItem
            title={task.title}
            status={task.completed}
            key={task.id}
            taskId={task.id}
            onDelete={onDeleteHandler}
            onCompletedHandler={onCompletedHandler}
          />
        );
      })}
    </ul>
  );
};

export default TasksList;
