import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RootClass from './routes/app.routes'
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css'
import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router >
    <RootClass/>
  <ToastContainer />  
    </Router>
 
  </StrictMode>,
)
