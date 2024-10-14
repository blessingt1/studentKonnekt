import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//main App component responsible for routing between different pages like Login, Signup, and Home.

import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Signup from './Signup'; 
import Login from './Login'; 
import Home from './Home'; 
import ListAssignmentVideo from './ListAssignmentVideo';  
import ProtectedLayout from './ProtectedLayout';
import Admin from './Admin';
import AssignmentsPage from './AssignmentsPage'; B_branch

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/assignments/submissions" element={<ListAssignmentVideo />} />
        </Route>

        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

