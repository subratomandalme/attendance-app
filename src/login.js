import React from 'react';
import './login.css'; // Importing the CSS file
import logo from './logo.png'; // Import the image

const login = () => {
  return (
    <div className="login-container">      
      <div className="login-logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="login-form">       
        <input type="text" placeholder="USERNAME" />
        <input type="password" placeholder="PASSWORD" />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default login;