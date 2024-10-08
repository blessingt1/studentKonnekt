import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import axios from 'axios'; // Importing axios for HTTP requests
import { useParams, useNavigate } from 'react-router-dom'; // Importing hooks for route parameters and navigation

// Component for viewing a video submission and providing feedback
function VideoSubmissionFeedback() {
    // State variables to manage the submission data, feedback, marks, loading state, and errors
    const [submission, setSubmission] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [marks, setMarks] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Extracting submissionId from the URL parameters using useParams
    const { submissionId } = useParams();
    
    // Hook to navigate programmatically after feedback is submitted
    const navigate = useNavigate();

    // useEffect to fetch the submission data when the component mounts or when submissionId changes
    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                // Retrieve the token and user role from local storage
                const token = localStorage.getItem('token');
                const userRole = localStorage.getItem('role');

                // Access control: only lecturers (role '0') and admins (role '1') can view submissions
                if (userRole !== '0' && userRole !== '1') {
                    throw new Error('Access denied. Only lecturers and admins can view submissions.');
                }

                // Fetch the submission data from the server, including the Authorization token
                const response = await axios.get(`http://localhost:8000/users/submissions/${submissionId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Update the state with the fetched submission data
                setSubmission(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                // Handle any errors that occur during the fetch process
                console.error('Error fetching submission:', err);
                setError(err.message || 'Failed to load submission. Please try again.');
                setLoading(false);
            }
        };

        // Trigger the fetchSubmission function
        fetchSubmission();
    }, [submissionId]); // Dependency on submissionId ensures the effect runs when this value changes

    // Function to handle feedback submission
    const handleSubmitFeedback = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission
        setLoading(true); // Start loading state
        setError(null); // Reset any previous errors

        try {
            // Retrieve token, role, and userId from local storage
            const token = localStorage.getItem('token');
            const userRole = localStorage.getItem('role');
            const userId = localStorage.getItem('userId');

            // Access control: only lecturers and admins can submit feedback
            if (userRole !== '0' && userRole !== '1') {
                throw new Error('Access denied. Only lecturers and admins can provide feedback.');
            }

            // Submit feedback and marks to the server using a POST request
            await axios.post(`http://localhost:8000/users/feedback`, 
                { submissionId, feedback, marks, lecturerId: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setLoading(false); // Stop loading after submission
            navigate('/submissions'); // Redirect back to submissions list after successful feedback submission
        } catch (err) {
            // Handle any errors that occur during feedback submission
            console.error('Error submitting feedback:', err);
            setError(err.message || 'Failed to submit feedback. Please try again.');
            setLoading(false);
        }
    };

    // Display loading message while data is being fetched or feedback is being submitted
    if (loading) return <div className="loading-message">Loading...</div>;

    // Display error message if there is an error
    if (error) return <div className="error-message">{error}</div>;

    // Main render: Display the submission details and feedback form
    return (
        <div className="video-submission-container">
            <h2 className="video-submission-title">Video Submission and Feedback</h2>
            {submission && ( // Only render submission details if the submission data is available
                <>
                    {/* Display submission details */}
                    <div className="submission-details">
                        <h4>Submission Details</h4>
                        <p><strong>Student:</strong> {submission.student.first_name} {submission.student.last_name}</p>
                        <p><strong>Submission Date:</strong> {new Date(submission.submissionDate).toLocaleDateString()}</p>
                    </div>
                    
                    {/* Video player to stream the submitted video */}
                    <div className="video-player">
                        <video controls width="100%">
                            <source src={`http://localhost:8000/lecturer/stream/${submissionId}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    
                    {/* Form to submit feedback and marks */}
                    <form onSubmit={handleSubmitFeedback} className="feedback-form">
                        <div>
                            <label htmlFor="feedback"><strong>Feedback</strong></label>
                            <textarea 
                                id="feedback"
                                rows="5" 
                                value={feedback} // Bind textarea value to feedback state
                                onChange={(e) => setFeedback(e.target.value)} // Update feedback state on change
                                required // Make the field required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="marks"><strong>Marks</strong></label>
                            <input 
                                type="number" 
                                id="marks"
                                min="0" 
                                max="100" 
                                value={marks} // Bind input value to marks state
                                onChange={(e) => setMarks(e.target.value)} // Update marks state on change
                                required // Make the field required
                            />
                        </div>
                        
                        {/* Submit button for the feedback form */}
                        <button 
                            type="submit" 
                            className="submit-feedback-btn"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default VideoSubmissionFeedback; // Export the component for use in other parts of the app
