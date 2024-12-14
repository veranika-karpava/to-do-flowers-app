import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { LABEL_THEME_MODE, TITLE_HEADER } from '../../constants';
import { uiActions } from '../../store/ui-slice';

import './Header.scss';
import Button from '../Button/Button';
import { AuthContext } from '../../helpers/context/AuthContext';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);

  const { isLoggedIn, userName, logout } = useContext(AuthContext);

  const mainHeader = isLoggedIn ? `${TITLE_HEADER.LOGIN}${userName}` : TITLE_HEADER.SIGNUP;

  const toggleTheme = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <header className={cn('header', { [theme]: theme })} >
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
          <h1 className="header__heading">{mainHeader}</h1>
          <Button
            icon={theme === LABEL_THEME_MODE.LIGHT ? 'BsSunFill' : 'FaMoon'}
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
