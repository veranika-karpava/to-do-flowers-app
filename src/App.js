import React from 'react';
import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



const App = () => {
  const [isDark, setIsDark] = useState(false);

  // add event for changing backround of the app
  const clickToggle = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="App">
      <Header clickToggle={clickToggle} isDark={isDark} />
      <h1>Hello World</h1>
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
