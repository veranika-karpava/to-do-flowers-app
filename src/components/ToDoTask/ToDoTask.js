import React from 'react';
import './ToDoTask.scss';
import cross from '../../assets/icons/icon-cross.svg';
import { useState } from 'react';

const ToDoTask = ({ isDark, task, deleteTask }) => {
    const [isCompleted, setIsCompleted] = useState(false)

    return (
        <li className={!isDark ? 'to-do-item' : 'to-do-item to-do-item__dark'}>
            <div className='to-do-item__container'>
                <input type='checkbox' onChange={() => setIsCompleted(!isCompleted)} checked={isCompleted} className='to-do-item__check-form' />
                <label className={!isCompleted ? 'to-do-item__label' : 'to-do-item__label to-do-item__label--checked'} >{task.name}</label>
            </div>
            <button className={!isCompleted ? 'to-do-item__button-remove' : 'to-do-item__button-remove to-do-item__button-remove--checked'} onClick={() => { deleteTask(task.name) }}>
                <img className='to-do-item__button-icon' src={cross} alt='Delete button' />
            </button>
        </li>
    );
};

export default ToDoTask;