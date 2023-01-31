import React, { useContext } from 'react';

import './TaskItem.scss';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import { AuthContext } from '../../helpers/context/AuthContext';
import Button from '../Button/Button';
import cross from '../../assets/icons/icon-cross.svg';
import DynamicIcon from '../DynamicIcon/DynamicIcon';


const TaskItem = ({ title, status }) => {
    const theme = useContext(ThemeContext);
    const auth = useContext(AuthContext);


    // // handler for delete one item
    // const deleteHandlerTask = () => {
    //     axios.delete(`http://localhost:8080/${task._id}`)
    //         .then((res) => {
    //             setDataTasks(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // //toggle handler for updating completed status
    // const completedHandlerTask = () => {
    //     let taskCompleted = dataTasks.find((item) => {
    //         if (item._id === task._id) {
    //             item.completed = !item.completed;
    //             return item
    //         }
    //     })
    //     axios.put(`http://localhost:8080/${task._id}`, taskCompleted)
    //         .then((res) => {
    //             setDataTasks(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    return (
        <li className={`tasks__item tasks__item--${theme.theme}`}>
            <div className={`tasks__item-container tasks__item-container--${theme.theme}`}>
                <div className='tasks__content-wrapper'>
                    <Button type='button' shape='circle' >
                        {status && <DynamicIcon name='AiOutlineCheck' className='tasks__icon-status' />}
                    </Button>
                    <p className={status ? `tasks__item-content tasks__item-content--completed-${theme.theme}` : 'tasks__item-content '}>{title}</p>
                </div>

                {!status &&
                    <Button type='button' shape='delete'>
                        <DynamicIcon name='RxCross2' className='tasks__icon-cross' />
                    </Button>
                }
            </div>
        </li >
    );
};

export default TaskItem;