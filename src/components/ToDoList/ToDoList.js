import React from 'react';
import ToDoTask from '../ToDoTask/ToDoTask';
import './ToDoList.scss';


const ToDoList = ({ isDark, dataTasks, deleteTask, completedTask }) => {

    return (
        <ul className={!isDark ? 'list' : 'list list__dark'}>
            {dataTasks.map((task, i) => {
                return <ToDoTask task={task} key={i} isDark={isDark} deleteTask={deleteTask} completedTask={completedTask} />
            })}
        </ul>
    );
};

export default ToDoList;
