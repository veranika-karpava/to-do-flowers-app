import React from 'react';
import './ToDoTask.scss';
import cross from '../../assets/icons/icon-cross.svg';
import { useState } from 'react';

const ToDoTask = ({ isDark, task }) => {
    const [isCompleted, setIsCompleted] = useState(false)

    const toDoCompleted = () => {
        setIsCompleted(true)
    }




    return (
        <li className={!isDark ? 'to-do-item' : 'to-do-item to-do-item__dark'}>
            <div className='to-do-item__container'>
                <input type='checkbox' onChange={toDoCompleted} checked={isCompleted} className='to-do-item__check-form' />
                <label className={!isCompleted ? 'to-do-item__label' : 'to-do-item__label to-do-item__label--checked'} >{task.name}</label>
            </div>
            <button>
                <img src={cross} alt='Delete button' />
            </button>
        </li>
    );
};

export default ToDoTask;