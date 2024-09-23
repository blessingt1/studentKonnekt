//main initializes the React app and mounts the App component to the root element in your HTML.
//React.StrictMode - helps identify potential problems in your app during development



import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)