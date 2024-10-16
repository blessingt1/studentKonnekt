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
            const assignmentResponse = await axios.get(`https://studentkonnekt-backend-api.onrender.com/assignments/${assignmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssignment(assignmentResponse.data);

            // Fetch submissions for the specific assignment
            const submissionsResponse = await axios.get(`https://studentkonnekt-backend-api.onrender.com/assignments/${assignmentId}/submissions`, {
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
        <>
        {/* Topbar Start */}
        <div className="container-fluid bg-dark">
            <div className="row py-2 px-lg-5">
            <div className="col-lg-6 text-left text-lg-left mb-2 mb-lg-0">
                <div className="d-inline-flex align-items-left text-white">
                <small><i className="contact"></i>(+27 18) 299 1111</small>
                <small className="contact">|</small>
                <small><i className="contact"></i>studies@nwu.ac.za</small>
                </div>
            </div>
            </div>
        </div>
        {/* Topbar End */}

        {/* Navbar Start */}
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
            <Link to="/" className="navbar-brand ml-lg-3 d-flex align-items-center">
                <img src="../media/nwuHeading.png" alt="Logo" className="mr-2" style={{ width: '50px', height: '50px', paddingTop: '5px' }} />
                <h1 className="m-0 text-uppercase" style={{ color: '#5e489d' }}>
                <i className="fa fa-book-reader mr-3" style={{ fontSize: 'small', color: '#5e489d' }}></i>User Administration
                </h1>
            </Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                <div className="navbar-nav mx-auto py-0">
                <Link to="/" className="nav-item nav-link active" style={{ color: 'black', ':hover': { color: 'purple' } }}>Home</Link>
                </div>
            </div>
            </nav>
        </div>
        {/* Navbar End */}



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

        </>
    );
}

export default ListAssignmentVideo;
