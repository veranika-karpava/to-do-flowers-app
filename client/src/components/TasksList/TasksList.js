import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { FILTER_TERM, EMPTY_LIST } from '../../data/constants.js';

import './TasksList.scss';
import TaskItem from '../TaskItem/TaskItem.js';

const TasksList = () => {
  const { tasks } = useSelector((state) => state.todos);
  const { theme, filter } = useSelector((state) => state.ui);

  const filteredTasks = useMemo(() => {
    return filter === FILTER_TERM.COMPLETED
      ? tasks.filter((task) => task.completed)
      : filter === FILTER_TERM.ACTIVE
        ? tasks.filter((task) => !task.completed)
        : tasks;
  }, [tasks, filter]);

  if (filteredTasks && filteredTasks.length === 0) {
    return <p className={cn('tasks__list', 'message', { [theme]: theme })}>{EMPTY_LIST.TEXT}</p>;
  }

  return (
    <ul className={cn('tasks__list', { [theme]: theme })}>
      {filteredTasks.map((task) => {
        return <TaskItem key={task.id} task={task} />;
      })}
    </ul>
  );
};

export default TasksList;
