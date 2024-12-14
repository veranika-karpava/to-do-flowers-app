import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { VALIDATION_TYPE, LABEL_TASK_INPUT, EMPTY_LIST, ITEMS_LEFT, LABEL_BUTTON } from '../../constants';

import './TasksPage.scss';
import { AuthContext } from '../../helpers/context/AuthContext';
import { useForm } from '../../helpers/hooks/FormHook';
import { useHttpClient } from '../../helpers/hooks/HttpHook';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import TasksList from '../../components/TasksList/TasksList';
import Navigation from '../../components/Navigation/Navigation';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TasksPage = () => {
  const theme = useSelector(state => state.ui.theme);

  const [clearInput, setClearInput] = useState(false);
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);

  const [filter, setFilter] = useState('all');

  const [filteredTasks, setFilteredTasks] = useState([]);

  const { isLoading, sendRequest } = useHttpClient();

  const { userId } = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  // for getting list of task specified user ID
  useEffect(() => {
    const fetchListTasks = async () => {
      try {
        const response = await sendRequest(`${API_URL}/tasks/${userId}`);
        setLoadedTasks(response.tasks);
      } catch (err) {
        console.log(`Get request loadedTask: ${err}`);
      }
    };
    fetchListTasks();
  }, [sendRequest, userId]);

  // for creating new task and to the existing list
  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await sendRequest(`${API_URL}/tasks/new`, 'POST', {
        title: formState.inputs.title.value,
        userId: userId,
      });
      setLoadedTasks(response.tasks);
      setClearInput(true);
    } catch (err) {
      console.error(`Post request for creating a new task: ${err.message}`);
    }
  };

  // for removing task from the list of tasks
  const deleteTaskHandler = async tid => {
    const prevTasks = [...loadedTasks];
    const updatedTasks = prevTasks.filter(task => task.id !== tid);
    setLoadedTasks(updatedTasks);
    try {
      await sendRequest(`${API_URL}/tasks/${tid}`, 'DELETE', {
        userId: userId,
      });
    } catch (err) {
      setLoadedTasks(prevTasks);
      console.error(`Failed to delete task with ID ${tid}: ${err.message}`);
    }
  };

  // for updating status of the task specified Id
  const updateStatusTaskHandler = async (tid, currentStatus) => {
    const prevTasks = [...loadedTasks];

    const updatedTasks = prevTasks.map(task => {
      if (task.id === tid) {
        return { ...task, completed: !currentStatus };
      }
      return task;
    });
    setLoadedTasks(updatedTasks);

    try {
      await sendRequest(`${API_URL}/tasks/${tid}`, 'PUT', {
        userId: userId,
        completed: !currentStatus,
      });
    } catch (err) {
      setLoadedTasks(prevTasks);
      console.error(`Failed to update satus of task ID ${tid}: ${err.message}`);
    }
  };

  // for deleting completed tasks
  const deleteAllCompletedHandler = async () => {
    try {
      const response = await sendRequest(
        `${API_URL}/tasks/completed/true`,
        'DELETE',
        {
          userId: userId,
        }
      );

      setLoadedTasks(response.tasks);
    } catch (err) {
      console.error(`Failed to delete completed tasks: ${err.message}`);
    }
  };

  // for counting active tasks
  useEffect(() => {
    if (!isLoading && loadedTasks) {
      const activeTasks = loadedTasks.filter(task => !task.completed);
      setActiveTasks(activeTasks);
    }
  }, [loadedTasks, isLoading]);

  useEffect(() => {
    const filteredTasks = loadedTasks.filter(task => {
      if (filter === 'active') {
        return !task.completed;
      }
      if (filter === 'completed') {
        return task.completed;
      }
      return true;
    });

    setFilteredTasks(filteredTasks);
  }, [filter, loadedTasks]);

  const handleSetFilter = (filterTask) => {
    setFilter(filterTask);
  };

  return (
    <section className={cn('tasks', theme)}>
      <Card>
        <form className="tasks__form" onSubmit={submitHandler}>
          <Button
            type="submit"
            shape="circle"
            icon="RiAddFill"
            classNameIcon="circle__icon-add"
          />
          <Input
            id={LABEL_TASK_INPUT.TITLE}
            placeholder={LABEL_TASK_INPUT.PLACEHOLDER}
            validators={[VALIDATION_TYPE.REQUIRE]}
            onInput={inputHandler}
            border="none"
            clearInput={clearInput}
            setClearInput={setClearInput}
          />
        </form>
      </Card>

      <div className="tasks__container">
        <Card>
          {isLoading && (
            <div className="tasks__message">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedTasks.length === 0 && (
            <div className="tasks__message">
              <p className={cn('tasks__content-message', theme)}>{EMPTY_LIST.TEXT}</p>
            </div>
          )}

          {!isLoading && loadedTasks && (
            <>
              <TasksList
                onDeleteHandler={deleteTaskHandler}
                filteredTasks={filteredTasks}
                onCompletedHandler={updateStatusTaskHandler}
              />
              <div className="tasks__action-container">
                <div className="tasks__container-nav">
                  <p className="tasks__left-items">{`${activeTasks.length} ${ITEMS_LEFT.TEXT}`}</p>

                  <Button
                    title={LABEL_BUTTON.CLEAR}
                    shape="nav"
                    onClick={deleteAllCompletedHandler}
                  />
                </div>
              </div>
            </>
          )}
        </Card>
        <Navigation filter={filter} onClick={handleSetFilter}/>
      </div>
    </section>
  );
};

export default TasksPage;
