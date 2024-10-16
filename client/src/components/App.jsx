//main App component responsible for routing between different pages like Login, Signup, and Home.
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Signup from './Signup'; 
import Login from './Login'; 
import Home from './Home'; 
import Admin from './Admin';
import AssignmentsPage from './AssignmentsPage';
import ListAssignmentVideo from './ListAssignmentVideo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/assignmentSubmissions/:assignmentId" element={<ListAssignmentVideo />} />
        <Route path="/assignmentSubmissions" element={<ListAssignmentVideo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
