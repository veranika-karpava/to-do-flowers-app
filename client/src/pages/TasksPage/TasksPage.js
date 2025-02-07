import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { useFetchTasksQuery, useCreateTaskMutation } from '../../store/todosApiSlice.js';
import { setTodoList, createNewToDo } from '../../store/todos-slice.js';
import { useForm } from '../../helpers/hooks/FormHook.js';
import { VALIDATION_TYPE, LABEL_TASK_INPUT } from '../../data/constants.js';

import './TasksPage.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';
import Card from '../../components/Card/Card.js';
import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/Input.js';
import TasksList from '../../components/TasksList/TasksList.js';
import ActionBar from '../../components/ActionBar/ActionBar.js';
import Navigation from '../../components/Navigation/Navigation.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.js';

const TasksPage = () => {
  const { theme } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const { data: tasksList, isLoading, isSuccess, isError, error } = useFetchTasksQuery();
  const [createTask, { isError: isNewError, error: newerr }] = useCreateTaskMutation();

  const [triggerClear, setTriggerClear] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      task: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTodoList(tasksList));
    }
  }, [isSuccess]);

  let content;

  if (isLoading) {
    content = (
      <div className="tasks__message">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    content = <div className="tasks__message">{error?.message}</div>;
  }

  if (isSuccess) {
    content = <TasksList />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setTriggerClear(false);
    const { task } = formState.inputs;
    try {
      const newTask = await createTask({ title: task.value }).unwrap();
      dispatch(createNewToDo(newTask));
      setTriggerClear((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const errorMessage = isNewError && newerr?.message;

  return (
    <section className={cn('tasks', theme)}>
      <Card>
        <form className="tasks__form" onSubmit={submitHandler}>
          <Button
            type="submit"
            variant="update"
            icon="RiAddFill"
            classNameIcon={cn('update', 'icon-add')}
            disabled={!formState.isFormValid}
          />
          <Input
            id={LABEL_TASK_INPUT.TITLE}
            placeholder={LABEL_TASK_INPUT.PLACEHOLDER}
            validators={[VALIDATION_TYPE.REQUIRE]}
            onInput={inputHandler}
            border="noborder"
            clearInput={triggerClear}
          />
        </form>
        {errorMessage && <ErrorMessage errorText={errorMessage} variant="new" />}
      </Card>
      <div className="tasks__container">
        <Card>
          {content}
          <ActionBar />
        </Card>
        <Navigation />
      </div>
    </section>
  );
};

export default TasksPage;
