import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup'; 
import Login from './Login';   
import Home from './Home';     
import AssignmentsPage from './AssignmentsPage';
import CreateAssignmentPage from './CreateAssignmentPage'; // Import the Create Assignment Page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/assignments/create" element={<CreateAssignmentPage />} /> {/* Add route for Create Assignment */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
