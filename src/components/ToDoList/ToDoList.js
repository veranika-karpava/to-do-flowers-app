import React from 'react';
import ToDoTask from '../ToDoTask/ToDoTask';
import './ToDoList.scss';


const ToDoList = ({ dataTasks }) => {
    return (
        <ul>
            {dataTasks.map((task, i) => {
                return <ToDoTask task={task} key={i} />
            })}
        </ul>
    );
};

export default ToDoList;
