import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ListAssignmentVideo() {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignmentAndSubmissions();
    }, [assignmentId]);

    const checkSession = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const expiryTime = localStorage.getItem('expiryTime');
        const now = new Date().getTime();

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

    const fetchAssignmentAndSubmissions = async () => {
        if (!checkSession()) return; 

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            
            // Fetch assignment details
            const assignmentResponse = await axios.get(`http://localhost:8000/assignments/${assignmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssignment(assignmentResponse.data);

            // Fetch submissions for the specific assignment
            const submissionsResponse = await axios.get(`http://localhost:8000/assignments/${assignmentId}/submissions`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSubmissions(submissionsResponse.data.submissions || []);
        } catch (err) {
            console.error('Error fetching assignment and submissions:', err);
            setError('Failed to load assignment and submissions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Submissions for Assignment: {assignment?.title}</h2>
            <p><strong>Description:</strong> {assignment?.description}</p>
            <Link to="/assignments" className="btn btn-secondary mb-3">Back to Assignments</Link>
            {submissions.length === 0 ? (
                <p>No submissions found for this assignment.</p>
            ) : (
                <div className="list-group">
                    {submissions.map((submission) => (
                        <div key={submission._id} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Submission by: {submission.student || 'Unknown Student'}</h5>
                                <small>Submitted on: {new Date(submission.submissionDate).toLocaleString()}</small>
                            </div>
                            {submission.videoPath && (
                                <div className="mt-2">
                                    <video width="320" height="240" controls>
                                        <source src={submission.videoPath} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListAssignmentVideo;