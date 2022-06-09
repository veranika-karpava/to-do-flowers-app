import React from 'react';
import './ToDoTask.scss';

const ToDoTask = ({ task }) => {

    return (
        <li>
            {task.name}
        </li>
    );
};

export default ToDoTask;