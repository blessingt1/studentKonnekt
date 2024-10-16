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

    const fetchAssignmentAndSubmissions = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        try {
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
            
            {/* Submissions Table Start */}
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Student</th>
                        <th>Submission Date</th>
                        <th>Video</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">No submissions found for this assignment.</td>
                        </tr>
                    ) : (
                        submissions.map((submission) => (
                            <tr key={submission._id}>
                                <td>{submission.student || 'Unknown Student'}</td>
                                <td>{new Date(submission.submissionDate).toLocaleString()}</td>
                                <td>
                                    {submission.videoPath && (
                                        <video width="320" height="240" controls>
                                            <source src={submission.videoPath} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {/* Submissions Table End */}
        </div>
    );
}

export default ListAssignmentVideo;
