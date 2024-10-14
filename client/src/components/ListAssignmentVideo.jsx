import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ListAssignmentVideo() {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputAssignmentId, setInputAssignmentId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubmissions();
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

    const fetchSubmissions = async () => {
        if (!checkSession()) return; 

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            let url = 'http://localhost:8000/assignments/submissions';
            if (assignmentId) {
                url = `http://localhost:8000/assignments/${assignmentId}/submissions`;
            }

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSubmissions(response.data.submissions || []);
        } catch (err) {
            console.error('Error fetching submissions:', err);
            setError('Failed to load submissions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputAssignmentId) {
            navigate(`/assignments/${inputAssignmentId}/submissions`);
        } else {
            navigate('/assignments/submissions');
        }
    };

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="submissions-list-container">
            <h2 className="submissions-list-title">
                {assignmentId ? `Submissions for Assignment ${assignmentId}` : 'All Submitted Assignments'}
            </h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Assignment ID"
                        value={inputAssignmentId}
                        onChange={(e) => setInputAssignmentId(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                            {inputAssignmentId ? 'View Submissions' : 'View All Submissions'}
                        </button>
                    </div>
                </div>
            </form>
            {submissions.length === 0 ? (
                <p>No submitted assignments found.</p>
            ) : (
                <div>
                    {submissions.map((submission) => (
                        <Link key={submission._id} to={`/submissions/${submission._id}`} className="submission-item">
                            <div>
                                <h5>{submission.assignment?.title || 'Untitled Assignment'}</h5>
                                <small>Submitted by: {submission.student || 'Unknown Student'}</small>
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