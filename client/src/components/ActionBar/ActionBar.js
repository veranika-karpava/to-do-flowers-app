import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ITEMS_LEFT, BUTTON_LABELS, FILTER_TERMS } from '../../data/constants.js';
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
      {filter !== FILTER_TERMS.COMPLETED && (
        <p className="tasks__left-items">{`${activeCount} ${ITEMS_LEFT.TEXT}`}</p>
      )}
      {filter !== FILTER_TERMS.ACTIVE && completedCount !== 0 && (
        <Button variant="filter" onClick={deleteAllCompletedHandler}>
          {BUTTON_LABELS.CLEAR}
        </Button>
      )}
    </div>
  );
};

export default ActionBar;
