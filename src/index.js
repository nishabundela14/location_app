import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom' ;
import {LoadScript} from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_Google_API_KEY}>
      <App/>
      </LoadScript>
    </Router>
  </React.StrictMode>
);