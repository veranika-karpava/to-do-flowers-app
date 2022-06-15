import React from 'react';
import ToDoTask from '../ToDoTask/ToDoTask';
import './ToDoList.scss';

const ToDoList = ({ isDark, dataTasks, filteredTasks, ...props }) => {

    return (
        <ul className={!isDark ? 'list' : 'list list__dark'}>
            {filteredTasks.map((task, i) => {
                return <ToDoTask task={task} key={i} dataTasks={dataTasks} isDark={isDark} {...props} />
            })}
        </ul>
    );
};

export default ToDoList;
