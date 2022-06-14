import React from 'react';
import './Navigation.scss';
import Button from '../Button/Button';

const Navigation = ({ isDark, deleteAllCompleted, countItemsLeft, filterAllData, filterActiveData, filterCompletedData }) => {
    return (
        <nav className='navigation'>
            <div className='navigation__container'>
                <div className={!isDark ? 'navigation__wrap-container' : 'navigation__wrap-container navigation__wrap-container-dark'}>
                    <p className='navigation__left-items'>{`${countItemsLeft()} items left`}</p>
                    <Button title='Clear Completed' isDark={isDark} onClick={deleteAllCompleted} />
                </div>
                <div className={!isDark ? 'navigation__wrap-filter' : 'navigation__wrap-filter navigation__wrap-filter-dark'}>
                    <Button title='All' isDark={isDark} onClick={filterAllData} />
                    <Button title='Active' isDark={isDark} onClick={filterActiveData} />
                    <Button title='Completed' isDark={isDark} onClick={filterCompletedData} />
                </div>
            </div>
        </nav>
    );
};

export default Navigation;