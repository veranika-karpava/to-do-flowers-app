import React from 'react';
import { useState } from 'react';
import './App.scss';
import data from './data/data.json';
import Header from './components/Header/Header';
import ToDoList from './components/ToDoList/ToDoList';
import Footer from './components/Footer/Footer';




const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [dataTasks, setDataTasks] = useState(data)

  // add event for changing backround of the app
  const clickToggle = () => {
    setIsDark(!isDark)
  }


  // delete task from list
  const deleteTask = (name) => {
    const newDataTasks = [...dataTasks];
    const index = newDataTasks.indexOf(name);
    newDataTasks.splice(index, 1);
    setDataTasks(newDataTasks);
  }


  return (
    <div className="App">
      <Header clickToggle={clickToggle} isDark={isDark} />
      <ToDoList isDark={isDark} dataTasks={dataTasks} deleteTask={deleteTask} />
      <h1>Hello World</h1>
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
