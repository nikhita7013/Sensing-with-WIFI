import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Optional: Add global CSS styles
import App from "./App"; // Import the main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Render the App to the root element
);
