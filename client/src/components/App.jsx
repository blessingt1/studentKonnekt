import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './Signup'; 
import Login from './Login';   
import Home from './Home';     
import AssignmentsPage from './AssignmentsPage'; // New path for the Assignments Page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/register" element={<Signup />} /> {/* Signup route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/home" element={<Home />} /> {/* Home route */}
        <Route path="/assignments" element={<AssignmentsPage />} /> {/* Lecturer's Assignments Page */}
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect any unknown route to login */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
