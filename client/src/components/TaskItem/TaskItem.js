import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import './TaskItem.scss';
import Button from '../Button/Button';

const TaskItem = ({
  title,
  status,
  taskId,
  handleTaskDelete,
  handleStatusChanged,
}) => {
  const theme = useSelector(state => state.ui.theme);

  return (
    <li className={cn('tasks__item', `tasks__item--${theme}`)}>
      <div className={cn('tasks__item-wrapper', `tasks__item-wrapper--${theme}`)}>
        <div className="tasks__content">
          <Button
            shape="circle"
            onClick={() => handleStatusChanged(taskId, status)}
            icon={status && 'AiOutlineCheck'}
            classNameIcon={cn({ 'circle__icon-status': status })}
          ></Button>
          <p
            className={cn('tasks__item-content', {
              [`completed-${theme}`]: status,
            })}
          >
            {title}
          </p>
        </div>
        {!status && (
          <Button
            shape="delete"
            onClick={() => handleTaskDelete(taskId)}
            icon="RxCross2"
            classNameIcon={cn('delete', 'icon-cross')}
          ></Button>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
