import React from 'react';
import './Navigation.scss'

const Navigation = ({ isDark }) => {
    return (
        <nav className='navigation'>
            <div className='navigation__container'>
                <div className={!isDark ? 'navigation__wrap-container' : 'navigation__wrap-container navigation__wrap-container-dark'}>
                    <p className='navigation__left-items'>items left</p>
                    <button className='navigation__clear-button' type="button" >Clear Completed</button>
                </div>
                <div className={!isDark ? 'navigation__wrap-filter' : 'navigation__wrap-filter navigation__wrap-filter-dark'}>
                    <button type="button" className='navigation__clear-button'>All</button>
                    <button type="button" className='navigation__clear-button'>Active</button>
                    <button type="button" className='navigation__clear-button'>Completed</button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;