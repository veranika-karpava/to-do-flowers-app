import React from 'react';
import './ToDoTask.scss';
import cross from '../../assets/icons/icon-cross.svg';


const ToDoTask = ({ isDark, task, dataTasks, setDataTasks }) => {


    // handler for delete one item
    const deleteHandlerTask = () => {
        setDataTasks(dataTasks.filter((item) => item.id !== task.id))
    }

    // handler for checked completed
    const completedHandlerTask = () => {
        setDataTasks(dataTasks.map((item) => {
            if (item.id === task.id) {
                return {
                    ...item, completed: !item.completed
                }
            }
            return item;
        }))
    }

    return (
        <li className={!isDark ? 'to-do-item' : 'to-do-item to-do-item__dark'}>
            <div className='to-do-item__container'>
                <input type='checkbox' onChange={completedHandlerTask} checked={task.completed} className='to-do-item__check-form' value={task.name} />
                <label className={!task.completed ? 'to-do-item__label' : 'to-do-item__label to-do-item__label--checked'} >
                    {task.name}</label>
            </div>
            <button type="button" className={!task.completed ? 'to-do-item__button-remove' : 'to-do-item__button-remove to-do-item__button-remove--checked'} onClick={deleteHandlerTask} >
                <img className='to-do-item__button-icon' src={cross} alt='Delete button' />
            </button>
        </li >
    );
};

export default ToDoTask;