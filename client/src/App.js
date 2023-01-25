import React from 'react';
import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ToDoPage from './pages/ToDoPage/ToDoPage';
import Footer from './components/Footer/Footer';
import { ThemeContext } from './helpers/context/ThemeContext';


const App = () => {
  const [theme, setTheme] = useState('light')
  // state staff
  const [isDark, setIsDark] = useState(false);


  // add event for changing backround of the app
  const clickToggle = () => {
    setIsDark(!isDark)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }


  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <div className="App">
        <Header clickToggle={clickToggle} isDark={isDark} />
        <ToDoPage isDark={isDark} />
        <Footer isDark={isDark} />
      </div>
    </ThemeContext.Provider>

  );
}

export default App;
