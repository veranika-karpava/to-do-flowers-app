import React from 'react';
import moon from '../../assets/icons/icon-moon.svg';
import sun from '../../assets/icons/icon-sun.svg';
import './Header.scss';

const Header = ({ clickToggle, isDark }) => {
    return (
        <header className={!isDark ? 'header header__light' : 'header header__dark'}>
            <div className='header__container'>
                <h1 className='header__heading'>todo</h1>
                {!isDark ? <img className='header__button-mode' src={moon} alt='Moon button' onClick={clickToggle} /> : <img className='header__button-mode' src={sun} alt='Sun button' onClick={clickToggle} />}
            </div>
        </header>
    );
};

export default Header;