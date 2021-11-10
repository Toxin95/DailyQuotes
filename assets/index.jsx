import React from 'react';
import ReactDOM from 'react-dom';
import Home from './routes/home';
import Register from './routes/register';

if (document.getElementById("root")) {
  ReactDOM.render( <Home /> , document.getElementById("root"));
}
if (document.getElementById("registration")) {
  ReactDOM.render( <Register /> , document.getElementById("registration"));
}
