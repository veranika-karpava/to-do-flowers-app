import React from 'react';
import ToDoTask from '../ToDoTask/ToDoTask';
import './ToDoList.scss';


const ToDoList = ({ isDark, dataTasks, deleteTask }) => {



    return (
        <ul className={!isDark ? 'list' : 'list list__dark'}>
            {dataTasks.map((task, i) => {
                return <ToDoTask task={task} key={i} isDark={isDark} deleteTask={deleteTask} />
            })}
        </ul>
    );
};

export default ToDoList;
