import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BUTTON_LABELS, FILTER_TERMS } from '../../data/constants.js';
import { setFilter } from '../../store/ui-slice.js';
import { selectActiveCount, selectCompletedCount } from '../../store/todos-slice.js';

import './Navigation.scss';
import Card from '../Card/Card.js';
import Button from '../Button/Button.js';

const Navigation = () => {
  const { filter } = useSelector((state) => state.ui);
  const { tasks } = useSelector((state) => state.todos);
  const activeCount = useSelector(selectActiveCount);
  const completedCount = useSelector(selectCompletedCount);

  const dispatch = useDispatch();

  const handleSetFilter = (e) => {
    dispatch(setFilter(e.target.id));
  };

  return (
    <div className="tasks__navigation">
      <Card>
        <div className="tasks__wrapper-container">
          <Button
            id={FILTER_TERMS.ALL}
            variant="filter"
            onClick={handleSetFilter}
            isActive={filter === FILTER_TERMS.ALL}
            count={tasks.length}
          >
            {BUTTON_LABELS.ALL}
          </Button>
          <Button
            id={FILTER_TERMS.ACTIVE}
            variant="filter"
            onClick={handleSetFilter}
            isActive={filter === FILTER_TERMS.ACTIVE}
            count={activeCount}
          >
            {BUTTON_LABELS.ACTIVE}
          </Button>
          <Button
            id={FILTER_TERMS.COMPLETED}
            variant="filter"
            onClick={handleSetFilter}
            isActive={filter === FILTER_TERMS.COMPLETED}
            count={completedCount}
          >
            {BUTTON_LABELS.COMPLETED}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Navigation;
