import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import './TasksPage.scss';
import { VALIDATOR_REQUIRE } from '../../helpers/util/validators';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import { AuthContext } from '../../helpers/context/AuthContext';
import { useForm } from '../../helpers/hooks/FormHook';
import { useHttpClient } from '../../helpers/hooks/HttpHook';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import DynamicIcon from '../../components/DynamicIcon/DynamicIcon';
import Input from '../../components/Input/Input';



import { v4 as uuidv4 } from 'uuid';
import TasksList from '../../components/TasksList/TasksList';
import Navigation from '../../components/Navigation/Navigation';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TasksPage = () => {
    const theme = useContext(ThemeContext);
    const auth = useContext(AuthContext);
    const { isLoading, error, setError, sendRequest } = useHttpClient();
    const [loadedTasks, setLoadedTasks] = useState();
    // state stuff
    const [inputText, setInputText] = useState('');
    const [dataTasks, setDataTasks] = useState([]);
    const [status, setStatus] = useState('all');
    const [filteredTasks, setFilteredTasks] = useState([])

    const userId = auth.userId;



    // for getting list of task specified user ID
    useEffect(() => {
        const fetchListTasks = async () => {
            try {
                const response = await sendRequest(
                    `${API_URL}/tasks/${userId}`
                );
                setLoadedTasks(response.tasks);
            } catch (err) {
                console.log(`Get request dataTasks: ${err}`)
            }
        };
        fetchListTasks();
    }, [sendRequest, userId])

    console.log(loadedTasks)

    //     axios
    //         .get(`http://localhost:8080/tasks/637c3510576fd93502c28e4c`)
    //         .then((res) => {
    //             console.log(res.data)
    //             setDataTasks(res.data.tasks)
    //         })
    //         .catch((err) => console.log(`Get request dataTasks: ${err}`))
    // }, [])



    // for adding new toDo task
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/tasks`, { id: uuidv4(), name: inputText, completed: false })
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

    const handleInputSubmit = () => {

    }

    return (
        <section className={`tasks tasks__${theme.theme}`}>
            <Card>
                <form className={`tasks__form tasks__form--${theme.theme}`}>
                    <Button type='submit' shape='circle'>
                        <DynamicIcon name='RiAddFill' className='tasks__icon-button' />
                    </Button>
                    <Input
                        id='newTask'
                        type='text'
                        label='New task'
                        placeholder='Create a new task...'
                        validators={[VALIDATOR_REQUIRE]}
                        onInput={handleInputSubmit}
                        border='none'
                    />
                </form>
            </Card>
            {isLoading && <LoadingSpinner />}

            <div className={`tasks__container tasks__container--${theme.theme}`}>
                <Card>
                    {!isLoading && !loadedTasks &&
                        <div className='tasks__message'>
                            <p className={`tasks__content-message tasks__content-message--${theme.theme}`}>Your TO-DO list is empty</p>
                        </div>}
                    {!isLoading && loadedTasks && <>
                        <TasksList loadedTasks={loadedTasks} setLoadedTasks={setLoadedTasks} filteredTasks={filteredTasks} />

                        <nav className='navigation'>
                            <div className='navigation__container'>
                                <div className='navigation__wrap-container'>
                                    <p className='navigation__left-items'>{`${loadedTasks.length} items left`}</p>
                                    <Button />
                                </div>
                                {/* <div className={!isDark ? 'navigation__wrap-filter' : 'navigation__wrap-filter navigation__wrap-filter-dark'}>
                                    <Button title='All' isDark={isDark} onClick={filterHandler} value='All' type='button' />
                                    <Button title='Active' isDark={isDark} onClick={filterHandler} value='Active' type='button' />
                                    <Button title='Completed' isDark={isDark} onClick={filterHandler} value='Completed' type='button' />
                                </div> */}
                            </div>
                        </nav>
                        {/* <Navigation
                            isDark={theme.theme}
                            dataTasks={loadedTasks}
                            setDataTasks={setDataTasks}
                            setStatus={setStatus}
                            filteredTasks={filteredTasks}
                        /> */}
                    </>}
                </Card>
            </div>
        </section>
    );
};

export default TasksPage;