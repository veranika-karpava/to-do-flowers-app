import React from 'react';

import { LABEL_BUTTON, FILTER_TERM } from '../../constants';

import Card from '../Card/Card';
import Button from '../Button/Button';

const Navigation = ({ filter, onClick }) => {

    const handleSetFilter = (e) => {
        onClick(e.target.id)
    };

    return (
        <div className="tasks__navigation">
            <Card>
            <div className="tasks__wrapper-container">
              <Button
                id={FILTER_TERM.ALL}
                title={LABEL_BUTTON.ALL}
                shape="nav"
                onClick = {handleSetFilter}
                active={filter === FILTER_TERM.ALL && 'active'}
              />
              <Button
                id={FILTER_TERM.ACTIVE}
                title={LABEL_BUTTON.ACTIVE}
                shape="nav"
                onClick = {handleSetFilter}
                active={filter === FILTER_TERM.ACTIVE && 'active'}
              />
              <Button
                id={FILTER_TERM.COMPLETED}
                title={LABEL_BUTTON.COMPLETED}
                shape="nav"
                onClick = {handleSetFilter}
                active={filter === FILTER_TERM.COMPLETED && 'active'}
              />
            </div>
          </Card>
        </div>
    );
};

export default Navigation;