import React from 'react';
import './ToDoPage.scss';
import { useState } from 'react';
import data from '../../data/data.json';
import Form from '../../components/Form/Form';
import ToDoList from '../../components/ToDoList/ToDoList';
import Navigation from '../../components/Navigation/Navigation';

const ToDoPage = ({ isDark }) => {
    // state staff
    const [inputText, setInputText] = useState(" ");
    const [dataTasks, setDataTasks] = useState(data);


    // for submiting form 
    const submitHandler = (e) => {
        e.preventDefault();
        setDataTasks([...dataTasks, { name: inputText, completed: false }]);
        setInputText('');
    }
    // for highlight finishing task
    const completedTask = (name) => {
        const newDataTasks = [...dataTasks];
        const index = newDataTasks.findIndex(item => item.name === name);
        if (!newDataTasks[index].completed) {
            newDataTasks[index].completed = true;
        } else {
            newDataTasks[index].completed = false;
        }
        setDataTasks(newDataTasks);
    }

    // delete task from list
    const deleteTask = (name) => {
        const newDataTasks = [...dataTasks];
        const index = newDataTasks.indexOf(name);
        newDataTasks.splice(index, 1);
        setDataTasks(newDataTasks);
    }

    // count of items in the list are left
    const countItemsLeft = () => {
        const LeftDataTasks = dataTasks.filter((task) => task.completed === false)
        const counter = LeftDataTasks.length;
        return counter;
    }

    // delete all completed tasks
    const deleteAllCompleted = () => {
        const completedDataTasks = dataTasks.filter((task) => !task.completed);
        setDataTasks(completedDataTasks);
    }

    // // filter handler 
    // const filterHandler = () => {
    //   switch (status) {
    //     case 'co'
    //   }
    // }

    // filter for all
    const filterAllData = () => {
        const allDataTasks = [...dataTasks];
        console.log(allDataTasks)
        setDataTasks(allDataTasks);
    }

    // filter for active items
    const filterActiveData = () => {
        const activeDataTasks = dataTasks.filter((task) => task.completed === true);
        console.log(activeDataTasks)
        setDataTasks(activeDataTasks);
    }

    // filter for completed items
    const filterCompletedData = () => {
        const completedDataTasks = dataTasks.filter((task) => task.completed === true);
        console.log(dataTasks)
        console.log(completedDataTasks)
        setDataTasks(completedDataTasks);
    }


    return (
        <section className={!isDark ? 'to-do-section' : 'to-do-section to-do-section__dark'}>
            <Form inputText={inputText} setInputText={setInputText} placeholder='Create a new todo... ' onClick={submitHandler} />
            <ToDoList isDark={isDark} dataTasks={dataTasks} deleteTask={deleteTask} completedTask={completedTask} />
            <Navigation isDark={isDark} deleteAllCompleted={deleteAllCompleted} countItemsLeft={countItemsLeft} filterAllData={filterAllData} filterActiveData={filterActiveData} filterCompletedData={filterCompletedData} />
        </section>
    );
};

export default ToDoPage;