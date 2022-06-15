import React from 'react';
import './ToDoPage.scss';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from '../../components/Form/Form';
import ToDoList from '../../components/ToDoList/ToDoList';
import Navigation from '../../components/Navigation/Navigation';

const ToDoPage = ({ isDark }) => {
    // state stuff
    const [inputText, setInputText] = useState('');
    const [dataTasks, setDataTasks] = useState([]);
    const [status, setStatus] = useState('all');
    const [filteredTasks, setFilteredTasks] = useState([])


    // for submiting form 
    const submitHandler = (e) => {
        e.preventDefault();
        setDataTasks([...dataTasks, { id: uuidv4(), name: inputText, completed: false }]);
        setInputText('');
    }

    // for filter data

    useEffect(() => {
        filterHandlerForUseEffect();
    }, [dataTasks, status]);

    const filterHandlerForUseEffect = () => {
        switch (status) {
            case "Completed":
                setFilteredTasks(dataTasks.filter((task) => task.completed === true))
                break;
            case "Active":
                setFilteredTasks(dataTasks.filter((task) => task.completed === false))
                break;
            default:
                setFilteredTasks(dataTasks);
                break;
        }
    }

    return (
        <section className={!isDark ? 'to-do-section' : 'to-do-section to-do-section__dark'}>
            <Form inputText={inputText} setInputText={setInputText} placeholder='Create a new todo... ' submitHandler={submitHandler} />
            {dataTasks.length === 0 ? <div className={!isDark ? 'message-container' : 'message-container message-container__dark'}>
                <p className='message-container__message'>Your TO-DO list is empty</p></div> : <>
                <ToDoList isDark={isDark} dataTasks={dataTasks} setDataTasks={setDataTasks} filteredTasks={filteredTasks} />
                <Navigation
                    isDark={isDark}
                    dataTasks={dataTasks}
                    setDataTasks={setDataTasks}
                    setStatus={setStatus}
                    filteredTasks={filteredTasks}
                />
            </>}
        </section>
    );
};

export default ToDoPage;