import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { LABEL_THEME_MODE  } from './constants';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import TasksPage from './pages/TasksPage/TasksPage';
import Footer from './components/Footer/Footer';
import { ThemeContext } from './helpers/context/ThemeContext';
import { AuthContext } from './helpers/context/AuthContext';

let logoutTimer;

const App = () => {
  const [theme, setTheme] = useState(LABEL_THEME_MODE.LIGHT);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === LABEL_THEME_MODE.LIGHT ? LABEL_THEME_MODE.DARK : LABEL_THEME_MODE.LIGHT));
  };

  // for logging user
  const login = useCallback((name, uid, token, expirationDate) => {
    setUserName(name);
    setUserId(uid);
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    // store token in local storage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userName: name,
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  // for logout user
  const logout = useCallback(() => {
    setUserName(null);
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userName,
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          userName,
          userId,
          login,
          logout,
        }}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            {token ? (
              <>
                <Route path="/tasks" exact component={TasksPage} />
                <Redirect to="/tasks" />
              </>
            ) : (
              <>
                <Route path="/" exact component={HomePage} />
                <Redirect to="/" />
              </>
            )}
          </Switch>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
