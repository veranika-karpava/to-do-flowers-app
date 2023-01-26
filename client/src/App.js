import React, { useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import TasksPage from './pages/TasksPage/TasksPage';
import Footer from './components/Footer/Footer';
import { ThemeContext } from './helpers/context/ThemeContext';


const App = () => {
  const [theme, setTheme] = useState('light')
  // state staff
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/tasks'>
            <TasksPage />
          </Route>
          <Redirect to='/' />
        </Switch>
        <Footer isDark={isDark} />
      </BrowserRouter>
    </ThemeContext.Provider >
  );
}

export default App;
