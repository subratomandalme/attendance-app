import React, { useState } from "react";
import WebcamImage from "./WebcamImage";
import Login from "./login"; // Assuming you have a Login component
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Here you would handle the login logic.
    // If the credentials are valid, set isLoggedIn to true.
    // This is a simple example, in a real application you would want to handle authentication more securely.
    if (username === 'expectedUsername' && password === 'expectedPassword') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? <WebcamImage /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;