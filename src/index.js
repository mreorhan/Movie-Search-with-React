import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import registerServiceWorker from './registerServiceWorker';
//import { BrowserRouter as Router   } from 'react-router-dom';
ReactDOM.render(
    <App/>
    , document.getElementById('root'));
registerServiceWorker();
