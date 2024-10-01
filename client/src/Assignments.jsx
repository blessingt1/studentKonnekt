// AssignmentsPage component responsible for listing lecturer's assignments.

import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Assignments.css'; // import CSS

function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        // Fetch assignments when the component loads
        axios.get("http://localhost:3001/assignments")
            .then(response => {
                setAssignments(response.data); // im gonna fix this if the API returns an array of assignments
            })
            .catch(error => console.log(error));
    }, []);

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
            </div>
        </div>
    );
}

export default AssignmentsPage;
