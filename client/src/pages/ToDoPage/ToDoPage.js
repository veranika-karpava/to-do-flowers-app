import React from 'react';
import './ToDoPage.scss';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Form from '../../components/Form/Form';
import ToDoList from '../../components/ToDoList/ToDoList';
import Navigation from '../../components/Navigation/Navigation';

const ToDoPage = ({ isDark }) => {
    // state stuff
    const [inputText, setInputText] = useState('');
    const [dataTasks, setDataTasks] = useState([]);
    const [status, setStatus] = useState('all');
    const [filteredTasks, setFilteredTasks] = useState([])


    // get toDoData to set to DataTasks
    useEffect(() => {
        axios
            .get(`http://localhost:8080/`)
            .then((res) => {
                setDataTasks(res.data)
            })
            .catch((err) => console.log(`Get request dataTasks: ${err}`))
    }, [])


    // for adding new toDo task
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/`, { id: uuidv4(), name: inputText, completed: false })
            .then((res) => {
                setDataTasks(res.data);
                setInputText('');
            })
            .catch((err) => {
                console.log(err)
            })
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
            <Form isDark={isDark} inputText={inputText} setInputText={setInputText} placeholder='Create a new todo... ' submitHandler={submitHandler} />
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