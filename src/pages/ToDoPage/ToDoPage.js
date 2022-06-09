import React from 'react';
import './ToDoPage.scss';
import ToDoList from '../../components/ToDoList/ToDoList';
import Navigation from '../../components/Navigation/Navigation';

const ToDoPage = ({ isDark, dataTasks, deleteTask }) => {
    return (
        <section className={!isDark ? 'to-do-section' : 'to-do-section to-do-section__dark'}>
            <ToDoList isDark={isDark} dataTasks={dataTasks} deleteTask={deleteTask} />
            <Navigation isDark={isDark} />
        </section>
    );
};

export default ToDoPage;