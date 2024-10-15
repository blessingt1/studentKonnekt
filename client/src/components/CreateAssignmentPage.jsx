import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';  // Custom styles

function CreateAssignmentPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [subject, setSubject] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        /*const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'lecturer') {
            alert("Access denied. Only lecturers can create assignments.");
            navigate("/login");
            return;
        }*/

        const newAssignment = {
            title,
            description,
            dueDate,
            subject
        };

        axios.post('http://localhost:8000/assignments', newAssignment, {
            headers: {
                Authorization: `Bearer ${token}`  // Send token for authentication
            }
        })
        .then(response => {
            alert('Assignment created successfully!');
            navigate('/assignments');  // Redirect to assignments page after successful creation
        })
        .catch(error => {
            console.error('Error creating assignment:', error);
            alert('Failed to create assignment. Please try again.');
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="bg-white p-4 rounded w-50">
                <h2 className="text-center mb-4">Create New Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><strong>Title</strong></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="title" 
                            placeholder="Enter assignment title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"><strong>Description</strong></label>
                        <textarea 
                            className="form-control" 
                            id="description" 
                            rows="4" 
                            placeholder="Enter assignment description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label"><strong>Due Date</strong></label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="dueDate" 
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label"><strong>Subject</strong></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="subject" 
                            placeholder="Enter subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Create Assignment</button>
                </form>
            </div>
        </div>
    );
}

export default CreateAssignmentPage;
