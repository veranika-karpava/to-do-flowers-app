import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { THEME_MODE, HEADER_TITLE } from '../../data/constants.js';

import { toggle } from '../../store/ui-slice.js';
import { useLogoutMutation } from '../../store/usersApiSlice.js';
import { useFetchQuoteQuery } from '../../store/uiApiSlice.js';

import './Header.scss';
import bgImageLight from '../../assets/images/bg-light.jpg';
import bgImageDark from '../../assets/images/bg-dark.jpg';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js';
import Button from '../Button/Button.js';

const Header = () => {
  const { theme } = useSelector((state) => state.ui);
  const { userInfo, isAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const { data: quote, isSuccess: isSuccessQuote } = useFetchQuoteQuery(undefined, {
    skip: !isAuth,
  });

  const toggleModeHandler = () => {
    dispatch(toggle(theme === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT));
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  const userGreeting = isAuth ? `${HEADER_TITLE.LOGIN}${userInfo.userName}` : HEADER_TITLE.SIGNUP;
  const iconButton = theme === THEME_MODE.LIGHT ? 'BsSunFill' : 'FaMoon';
  const backgroundImage = theme === THEME_MODE.LIGHT ? bgImageLight : bgImageDark;

  return (
    <header
      className={cn('header', { [theme]: theme })}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {isLoading && (
        <div className="tasks__message">
          <LoadingSpinner />
        </div>
      )}
      <div className="header__container">
        <div className="header__nav-item">
          <Button
            variant="round"
            classNameIcon="icon-inside"
            icon={iconButton}
            onClick={toggleModeHandler}
          />
          {isAuth && (
            <Button onClick={logout} variant="round" icon="BiExit" classNameIcon="icon-inside" />
          )}
        </div>
        <div className="header__wrapper">
          <h1 className="header__heading">{userGreeting}</h1>
          {isAuth && isSuccessQuote && quote ? (
            <blockquote className="header__quote">
              <p className="header__quote-content">{quote.text}</p>
              <footer className="header__quote-footer">— {quote.author}</footer>
            </blockquote>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
