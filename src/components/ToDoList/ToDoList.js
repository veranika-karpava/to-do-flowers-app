import React from 'react';
import ToDoTask from '../ToDoTask/ToDoTask';
import './ToDoList.scss';

const ToDoList = ({ isDark, dataTasks, ...props }) => {

    return (
        <ul className={!isDark ? 'list' : 'list list__dark'}>
            {dataTasks.map((task, i) => {
                return <ToDoTask task={task} key={i} {...props} />
            })}
        </ul>
    );
};

export default ToDoList;
