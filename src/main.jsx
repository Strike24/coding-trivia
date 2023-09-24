import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Trivia from './routes/Trivia.jsx'
import { ToastContainer } from 'react-toastify';

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/trivia",
    element: <Trivia />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
)
