import React, { useContext } from 'react';

import TaskItem from '../TaskItem/TaskItem';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import './TasksList.scss';

const TasksList = ({ loadedTasks }) => {
    const theme = useContext(ThemeContext);

    console.log(loadedTasks)

    return (
        <ul className={`tasks__list tasks__list--${theme.theme}`}>
            {
                loadedTasks.map((task, i) => {
                    return (
                        <TaskItem
                            title={task.title}
                            status={task.completed}
                            key={i}
                        />
                    )
                })
            }
        </ul >
    );
};

export default TasksList;
