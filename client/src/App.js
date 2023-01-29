import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import TasksPage from './pages/TasksPage/TasksPage';
import Footer from './components/Footer/Footer';
import { ThemeContext } from './helpers/context/ThemeContext';
import { AuthContext } from './helpers/context/AuthContext';

let logoutTimer;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    // token expiration date
    // new date obj that based on current date plus one hour
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    // store token in local storage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
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
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);


  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact>
              <HomePage />
            </Route>
            {token ?
              <Route path='/tasks'>
                <TasksPage />
              </Route>
              :
              <Route path='/' exact>
                <HomePage />
              </Route>
            }
            <Redirect to='/' />
          </Switch>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeContext.Provider >
  );
}

export default App;
