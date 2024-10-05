// Main App component responsible for routing between different pages like Login, Signup, Home, and Assignments Page.

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import AssignmentsPage from './AssignmentsPage'; // Importing the new Assignments Page component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/assignments" element={<AssignmentsPage />} /> {/* New route for the Assignments Page */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
