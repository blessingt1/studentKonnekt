import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ListAssignmentVideo() {
    const { assignmentId } = useParams(); // Get the assignment ID from the route parameters
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = () => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const expiryTime = localStorage.getItem('expiryTime');
            const now = new Date().getTime();

            console.log('Token:', token);
            console.log('Role:', role);
            console.log('ExpiryTime:', expiryTime);
            console.log('Current Time:', now);

            if (!token || now > expiryTime) {
                localStorage.clear();  
                navigate('/login'); 
                return false;
            }

            if (role !== '0' && role !== '1') {
                setError('Access denied. Only lecturers and admins can view submissions.');
                return false;
            }

            return true;
        };

        const fetchSubmissions = async () => {
            if (!checkSession()) return; 

            try {
                const token = localStorage.getItem('token');
                console.log('Fetching submissions with token:', token);

                const response = await axios.get(`http://localhost:8000/assignments/${assignmentId}/submissions`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log('Submissions response:', response.data);
                setSubmissions(response.data);
            } catch (err) {
                console.error('Error fetching submissions:', err);
                setError('Failed to load submissions. Please try again.');
            } finally {
                setLoading(false); 
            }
        };

        fetchSubmissions();
    }, [navigate, assignmentId]); // dependency on assignmentId

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="submissions-list-container">
            <h2 className="submissions-list-title">Submitted Video Assignments</h2>
            {submissions.length === 0 ? (
                <p>No submitted assignments found.</p>
            ) : (
                <div>
                    {submissions.map((submission) => (
                        <Link key={submission._id} to={`/submissions/${submission._id}`} className="submission-item">
                            <div>
                                <h5>{submission.assignment.title}</h5>
                                <small>Submitted by: {submission.student.first_name} {submission.student.last_name}</small>
                            </div>
                            <span className="view-badge">View</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListAssignmentVideo;
