import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'components/App';
import 'normalize.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename="/goit-react-hw-05-movies/">
      <App />
      <ToastContainer />
    </Router>
  </React.StrictMode>
);
