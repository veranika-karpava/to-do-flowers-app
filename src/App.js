import React from 'react';
import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ToDoPage from './pages/ToDoPage/ToDoPage';
import Footer from './components/Footer/Footer';


const App = () => {
  // state staff
  const [isDark, setIsDark] = useState(false);


  // add event for changing backround of the app
  const clickToggle = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="App">
      <Header clickToggle={clickToggle} isDark={isDark} />
      <ToDoPage isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
