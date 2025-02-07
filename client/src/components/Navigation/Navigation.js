import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LABEL_BUTTON, FILTER_TERM } from '../../data/constants.js';
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
            id={FILTER_TERM.ALL}
            variant="filter"
            onClick={handleSetFilter}
            isActive={filter === FILTER_TERM.ALL}
            count={tasks.length}
          >
            {LABEL_BUTTON.ALL}
          </Button>
          <Button
            id={FILTER_TERM.ACTIVE}
            variant="filter"
            onClick={handleSetFilter}
            isActive={filter === FILTER_TERM.ACTIVE}
            count={activeCount}
          >
            {LABEL_BUTTON.ACTIVE}
          </Button>
          <Button
            id={FILTER_TERM.COMPLETED}
            variant="filter"
            onClick={handleSetFilter}
            isActive={filter === FILTER_TERM.COMPLETED}
            count={completedCount}
          >
            {LABEL_BUTTON.COMPLETED}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Navigation;
