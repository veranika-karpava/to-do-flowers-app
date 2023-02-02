import React, { useState, useEffect, useContext } from 'react';

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
import TasksList from '../../components/TasksList/TasksList';

const API_URL = process.env.REACT_APP_BACKEND_URL;


const TasksPage = () => {
    const theme = useContext(ThemeContext);
    const auth = useContext(AuthContext);
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedTasks, setLoadedTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [isFiltered, setIsFiltred] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    const userId = auth.userId;

    const [formState, handleInputSubmit, setFormData] = useForm({
        title: {
            value: '',
            isValid: false,
        },
    },
        true
    );

    // for creating new task and to the existing list
    const submitHandler = async e => {
        e.preventDefault();
        try {
            const response = await sendRequest(
                `${API_URL}/tasks/new`,
                'POST',
                {
                    title: formState.inputs.title.value,
                    userId: auth.userId
                },
            );
            setLoadedTasks(response.tasks);
        } catch (err) {
            console.log(err);
        }
    };

    // for getting list of task specified user ID
    useEffect(() => {
        const fetchListTasks = async () => {
            try {
                const response = await sendRequest(
                    `${API_URL}/tasks/${userId}`
                );
                setLoadedTasks(response.tasks);
            } catch (err) {
                console.log(`Get request loadedTask: ${err}`)
            }
        };
        fetchListTasks();
    }, [sendRequest, userId]);

    //for removing task from the list of tasks
    const onDeleteHandler = async (taskId) => {
        try {
            const response = await sendRequest(
                `${API_URL}/tasks/${taskId}`,
                'DELETE',
                {
                    userId: userId,
                },
            );
            setLoadedTasks(response.tasks)
        } catch (err) {
            console.log(err)
        }
    };

    // for updating status of the task specified Id
    const updateStatusTask = async (tid, status) => {
        try {
            const response = await sendRequest(
                `${API_URL}/tasks/${tid}`,
                'PUT',
                {
                    userId: auth.userId,
                    completed: !status,
                }
            );

            setLoadedTasks(response.tasks);
        } catch (err) {
            console.log(`Get request dataTasks: ${err}`)
        }
    };

    // for counting active tasks
    useEffect(() => {
        if (!isLoading && loadedTasks) {
            const activeDataTasks = loadedTasks.filter((task) => {
                return task.completed === false
            });
            setActiveTasks(activeDataTasks);
        }
    }, [loadedTasks, isLoading]);

    //for removing all completed tasks from the list of tasks
    const onDeleteCompletedHandler = async () => {
        try {
            const response = await sendRequest(
                `${API_URL}/tasks/completed/true`,
                'DELETE',
                {
                    userId: userId,
                },
            );
            setLoadedTasks(response.tasks)
        } catch (err) {
            console.log(err)
        }
    };

    // for filtering data
    useEffect(() => {
        const filterHandlerForUseEffect = () => {
            switch (isFiltered) {
                case "Completed":
                    setFilteredTasks(loadedTasks.filter((task) => task.completed === true))
                    break;
                case "Active":
                    setFilteredTasks(loadedTasks.filter((task) => task.completed === false))
                    break;
                default:
                    setFilteredTasks(loadedTasks);
                    break;
            }
        }
        filterHandlerForUseEffect();
    }, [loadedTasks, isFiltered]);



    const onfilterHandler = (e) => {
        setIsFiltred(e.target.value)
    }

    return (
        <section className={`tasks tasks__${theme.theme}`}>
            <Card>
                <form className={`tasks__form tasks__form--${theme.theme}`} onSubmit={submitHandler}>
                    <Button type='submit' shape='circle'>
                        <DynamicIcon name='RiAddFill' className='tasks__icon-button' />
                    </Button>
                    <Input
                        id='title'
                        type='text'
                        label='title'
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
                    {!isLoading && loadedTasks.length === 0 &&
                        <div className='tasks__message'>
                            <p className={`tasks__content-message tasks__content-message--${theme.theme}`}>Your TO-DO list is empty</p>
                        </div>}
                    {!isLoading && loadedTasks &&
                        <>
                            <TasksList
                                onDeleteHandler={onDeleteHandler}
                                filteredTasks={filteredTasks}
                                onCompletedHandler={updateStatusTask}
                            />
                            <div className='tasks__action-container'>
                                <div className='tasks__container-nav'>
                                    <p className='tasks__left-items'>{`${activeTasks.length} items left`}</p>
                                    <Button type='button' title='Clear Completed' shape='nav' onClick={onDeleteCompletedHandler} />
                                </div>
                            </div>
                        </>}
                </Card>
                <div className='tasks__navigation'>
                    <Card>
                        <div className='tasks__wrapper-container'>
                            <Button type='button' title='All' shape='nav' onClick={onfilterHandler} value='' active={isFiltered === '' && 'active'} />
                            <Button type='button' title='Active' shape='nav' onClick={onfilterHandler} value='Active' active={isFiltered === 'Active' && 'active'} />
                            <Button type='button' title='Completed' shape='nav' onClick={onfilterHandler} value='Completed' active={isFiltered === 'Completed' && 'active'} />
                        </div >
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default TasksPage;