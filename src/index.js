import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';

import './index.scss';
import './assets/style/tailwind.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
