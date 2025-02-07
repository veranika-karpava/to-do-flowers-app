import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './App.scss';
import Layout from './components/Layout/Layout.js';
import ProtectLayout from './components/ProtectLayout/ProtectLayout.js';
import HomePage from './pages/HomePage/HomePage.js';
import TaskPage from './pages/TasksPage/TasksPage.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'tasks',
        element: <ProtectLayout />,
        children: [{ index: true, element: <TaskPage /> }],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
