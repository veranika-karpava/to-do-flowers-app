import React from 'react';
import { useState } from 'react';
import './App.scss';
import data from './data/data.json';
import Header from './components/Header/Header';
import ToDoPage from './pages/ToDoPage/ToDoPage';
import Footer from './components/Footer/Footer';




const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [dataTasks, setDataTasks] = useState(data)

  // add event for changing backround of the app
  const clickToggle = () => {
    setIsDark(!isDark)
  }
  // for highlight finishing task
  const completedTask = (name) => {
    const newDataTasks = [...dataTasks];
    const index = newDataTasks.findIndex(item => item.name === name);
    if (!newDataTasks[index].completed) {
      newDataTasks[index].completed = true;
    } else {
      newDataTasks[index].completed = false;
    }
    setDataTasks(newDataTasks);
  }

  // delete task from list
  const deleteTask = (name) => {
    const newDataTasks = [...dataTasks];
    const index = newDataTasks.indexOf(name);
    newDataTasks.splice(index, 1);
    setDataTasks(newDataTasks);
  }

  // count of items in the list are left
  const countItemsLeft = () => {
    const LeftDataTasks = dataTasks.filter((task) => task.completed === false)
    const counter = LeftDataTasks.length;
    return counter;
  }

  // delete all completed tasks
  const deleteAllCompleted = () => {
    const completedDataTasks = dataTasks.filter((task) => !task.completed);
    console.log(completedDataTasks)
    setDataTasks(completedDataTasks);
  }


  return (
    <div className="App">
      <Header clickToggle={clickToggle} isDark={isDark} />
      <ToDoPage isDark={isDark} dataTasks={dataTasks} completedTask={completedTask} deleteTask={deleteTask} deleteAllCompleted={deleteAllCompleted} countItemsLeft={countItemsLeft} />
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
