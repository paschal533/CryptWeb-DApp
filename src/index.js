import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { TransactionsProvider } from "./context/TransactionContext";

import App from './App';
import './index.css';

ReactDOM.render(
  <Router>
    <TransactionsProvider> 
      <App />
    </TransactionsProvider>
  </Router>,
  document.getElementById('root'),
);

