import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import DynamicIcon from '../DynamicIcon/DynamicIcon';
import './Header.scss';
import { ThemeContext } from '../../helpers/context/ThemeContext';

const Header = () => {
    const theme = useContext(ThemeContext);

    return (
        <header className={`header header__${theme.theme}`}>
            <div className='header__container'>
                <div className='header__nav-item'>
                    <NavLink className='header__nav-link' exact to='/'>
                        <DynamicIcon name='BiExit' className='header__icon' />
                    </NavLink>
                </div>
                <div className='header__wrapper'>
                    <h1 className='header__heading'>todo</h1>
                    <button
                        className='header__button-mode'
                        onClick={theme.toggleTheme}>
                        <DynamicIcon
                            name={theme.theme === 'light' ? 'BsSunFill' : 'FaMoon'}
                            className='header__icon' />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;