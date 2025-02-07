import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ITEMS_LEFT, LABEL_BUTTON, FILTER_TERM } from '../../data/constants.js';
import { useDeleteCompletedTasksMutation } from '../../store/todosApiSlice.js';
import {
  deleteCompletedToDos,
  selectActiveCount,
  selectCompletedCount,
} from '../../store/todos-slice.js';

import './ActionBar.scss';
import Button from '../Button/Button.js';

const ActionBar = () => {
  const activeCount = useSelector(selectActiveCount);
  const completedCount = useSelector(selectCompletedCount);
  const { filter } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [deleteCompletedTask] = useDeleteCompletedTasksMutation();

  const deleteAllCompletedHandler = async () => {
    try {
      const delList = await deleteCompletedTask().unwrap();
      dispatch(deleteCompletedToDos(delList));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tasks__action-container">
      {filter !== FILTER_TERM.COMPLETED && (
        <p className="tasks__left-items">{`${activeCount} ${ITEMS_LEFT.TEXT}`}</p>
      )}
      {filter !== FILTER_TERM.ACTIVE && completedCount !== 0 && (
        <Button variant="filter" onClick={deleteAllCompletedHandler}>
          {LABEL_BUTTON.CLEAR}
        </Button>
      )}
    </div>
  );
};

export default ActionBar;
