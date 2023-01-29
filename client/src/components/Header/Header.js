import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import DynamicIcon from '../DynamicIcon/DynamicIcon';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import { AuthContext } from '../../helpers/context/AuthContext';
import './Header.scss';


const Header = () => {
    const theme = useContext(ThemeContext);
    const auth = useContext(AuthContext);
    console.log(auth)

    return (
        <header className={`header header__${theme.theme}`}>
            <div className='header__container'>
                <div className='header__nav-item'>
                    {auth.isLoggedIn && (<NavLink className='header__nav-link' exact to='/' onClick={auth.logout}>
                        <DynamicIcon name='BiExit' className='header__icon' />
                    </NavLink>)}
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