import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './Signup'; 
import Login from './Login'; 
import Home from './Home'; 
import ListAssignmentVideo from './ListAssignmentVideo';  
import ProtectedLayout from './ProtectedLayout';

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
          <Route path="/assignments/submissions" element={<ListAssignmentVideo />} />
          <Route path="/assignments/:assignmentId/submissions" element={<ListAssignmentVideo />} /> {/* Dynamic route */}
        </Route>

        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
