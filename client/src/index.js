/*    _ _  _ ___  ____ ____ ___ ____
      | |\/| |__] |  | |__/  |  [__
      | |  | |    |__| |  \  |  ___]    */

import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mongoose from 'mongoose';




//const bodyParser = require('body-parser');
//const data = require('./models/dogs.js');
      


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
