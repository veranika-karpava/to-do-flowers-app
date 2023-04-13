import React, { useContext } from 'react';
import cn from 'classnames';

import './Header.scss';
import Button from '../Button/Button';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import { AuthContext } from '../../helpers/context/AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, userName, logout } = useContext(AuthContext);

  return (
    <header className={cn('header', { [theme]: theme })}>
      <div className="header__container">
        <div className="header__nav-item">
          {isLoggedIn && (
            <Button
              to="/"
              onClick={logout}
              icon="BiExit"
              classNameIcon="btn-circle__icon"
            />
          )}
        </div>
        <div className="header__wrapper">
          <h1 className="header__heading">
            {isLoggedIn ? `Welcome,${userName}` : 'todo'}
          </h1>
          <Button
            icon={theme === 'light' ? 'BsSunFill' : 'FaMoon'}
            classNameIcon="btn-circle__icon"
            onClick={toggleTheme}
            mode
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
