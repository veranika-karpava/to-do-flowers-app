import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { LABEL_THEME_MODE, TITLE_HEADER } from '../../constants';
import { uiActions } from '../../store/ui-slice';
import { authActions } from '../../store/auth-slice';

import './Header.scss';
import Button from '../Button/Button';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userName = useSelector(state => state.auth.userName);

  const handleToggleTheme = () => {
    dispatch(uiActions.toggle());
  };

  const handleUserLogout = () => {
    dispatch(authActions.logout())
  };

  const userGreeting = isAuthenticated ? `${TITLE_HEADER.LOGIN}${userName}` : TITLE_HEADER.SIGNUP;

  return (
    <header className={cn('header', { [theme]: theme })} >
      <div className="header__container">
        <div className="header__nav-item">
          {isAuthenticated && (
            <Button
              to="/"
              onClick={handleUserLogout}
              icon="BiExit"
              classNameIcon="btn-circle__icon"
            />
          )}
        </div>
        <div className="header__wrapper">
          <h1 className="header__heading">{userGreeting}</h1>
          <Button
            icon={theme === LABEL_THEME_MODE.LIGHT ? 'BsSunFill' : 'FaMoon'}
            classNameIcon="btn-circle__icon"
            onClick={handleToggleTheme}
            mode
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
