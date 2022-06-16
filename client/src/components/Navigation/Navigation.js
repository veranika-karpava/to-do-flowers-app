import React from 'react';
import './Navigation.scss';
import Button from '../Button/Button';

const Navigation = ({ isDark, dataTasks, setDataTasks, setStatus, filteredTasks }) => {


    // count of items in the list are left
    const countedActiveTasks = () => {
        const ActiveDataTasks = filteredTasks.filter((task) => task.completed === false)
        const counter = ActiveDataTasks.length;
        return counter;
    }

    // delete all completed tasks
    const deleteHandlerAllCompleted = () => {
        setDataTasks(dataTasks.filter((task) => !task.completed));
    }

    // add filter features
    const filterHandler = (e) => {
        setStatus(e.target.value)
    }


    return (
        <nav className='navigation'>
            <div className='navigation__container'>
                <div className={!isDark ? 'navigation__wrap-container' : 'navigation__wrap-container navigation__wrap-container-dark'}>
                    <p className='navigation__left-items'>{`${countedActiveTasks()} items left`}</p>
                    <Button title='Clear Completed' isDark={isDark} onClick={deleteHandlerAllCompleted} />
                </div>
                <div className={!isDark ? 'navigation__wrap-filter' : 'navigation__wrap-filter navigation__wrap-filter-dark'}>
                    <Button title='All' isDark={isDark} onClick={filterHandler} value='All' />
                    <Button title='Active' isDark={isDark} onClick={filterHandler} value='Active' />
                    <Button title='Completed' isDark={isDark} onClick={filterHandler} value='Completed' />
                </div>
            </div>
        </nav>
    );
};

export default Navigation;