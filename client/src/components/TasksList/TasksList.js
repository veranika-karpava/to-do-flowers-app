import React from 'react';

import './TasksList.scss';
import TaskItem from '../TaskItem/TaskItem';

const TasksList = ({ onDeleteHandler, onCompletedHandler, filteredTasks }) => {


  return (
    <ul className="tasks__list">
      {filteredTasks.map(task => {
        return (
          <TaskItem
            key={task.id}
            taskId={task.id}
            title={task.title}
            status={task.completed}
            handleTaskDelete={onDeleteHandler}
            handleStatusChanged={onCompletedHandler}
          />
        );
      })}
    </ul>
  )
}

export default TasksList;
