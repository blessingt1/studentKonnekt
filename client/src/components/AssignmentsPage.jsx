import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/Assignment.css'; // Updated path for the CSS file
import { useNavigate } from "react-router-dom";

function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate(); // Hook for navigating programmatically

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const role = localStorage.getItem('role'); // Get the role from localStorage

        if (!token || role !== 'lecturer') {
            alert("Access denied. Only lecturers can view assignments.");
            navigate("/login"); // Redirect to login if not authorized
            return;
        }

        // Fetch assignments with authentication
        axios.get("http://localhost:8000/lecturer/assignments", {
            headers: {
                Authorization: `Bearer ${token}` // Attach token in request header
            }
        })
        .then(response => {
            setAssignments(response.data); // Update the state with fetched assignments
        })
        .catch(error => console.log("Error fetching assignments:", error));
    }, [navigate]);

    const handleRowClick = (assignmentId) => {
        navigate(`/assignments/${assignmentId}`); // Redirect to detailed assignment page
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-75 assignment-container">
                <h2 className="text-center">Your Assignments</h2>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length > 0 ? (
                            assignments.map((assignment) => (
                                <tr key={assignment._id} onClick={() => handleRowClick(assignment._id)}>
                                    <td>{assignment.title}</td>
                                    <td>{assignment.description}</td>
                                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                                    <td>{assignment.subject}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No assignments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AssignmentsPage;
