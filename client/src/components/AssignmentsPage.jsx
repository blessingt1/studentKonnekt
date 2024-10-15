import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../../styles/styles.css';

function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        /*if (!token || role !== 'lecturer') {
            alert("Access denied. Only lecturers can view assignments.");
            navigate("/login");
            return;
        }*/

        axios.get("http://localhost:8000/assignments", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setAssignments(response.data);
        })
        .catch(error => console.log("Error fetching assignments:", error));
    }, [navigate]);

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
                                <tr key={assignment._id}>
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
                {/* Create New Assignment Button */}
                <div className="d-flex justify-content-end">
                    <Link to="/assignments/create" className="btn btn-primary mt-3">
                        Create New Assignment
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AssignmentsPage;
