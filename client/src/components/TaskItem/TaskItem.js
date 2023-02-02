import React, { useContext } from 'react';

import './TaskItem.scss';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import Button from '../Button/Button';
import DynamicIcon from '../DynamicIcon/DynamicIcon';


const TaskItem = ({ title, status, onDelete, taskId, onCompletedHandler }) => {
    const theme = useContext(ThemeContext);

    return (
        <li className={`tasks__item tasks__item--${theme.theme}`}>
            <div className={`tasks__item-container tasks__item-container--${theme.theme}`}>
                <div className='tasks__content-wrapper'>
                    <Button type='button' shape='circle' onClick={() => onCompletedHandler(taskId, status)}>
                        {status && <DynamicIcon name='AiOutlineCheck' className='tasks__icon-status' />}
                    </Button>
                    <p className={status ? `tasks__item-content tasks__item-content--completed-${theme.theme}` : 'tasks__item-content '}>{title}</p>
                </div>

                {!status &&
                    <Button type='button' shape='delete' onClick={() => onDelete(taskId)}>
                        <DynamicIcon name='RxCross2' className='tasks__icon-cross' />
                    </Button>
                }
            </div>
        </li >
    );
};

export default TaskItem;