import React, { useState, useEffect } from 'react'; // Importing React, and useState and useEffect hooks
import axios from 'axios'; // Importing axios for HTTP requests
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation

// Component to display a list of submitted assignments
function SubmittedAssignmentsList() {
    // State variables for managing submissions data, loading state, and error handling
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect hook runs on component mount to fetch the submitted assignments
    useEffect(() => {
        // Async function to fetch submissions from the server
        const fetchSubmissions = async () => {
            try {
                // Retrieve the token and role from local storage for authentication
                const token = localStorage.getItem('token');
                const userRole = localStorage.getItem('role');

                // Restrict access based on user role, only allowing lecturers (0) and admins (1)
                if (userRole !== '0' && userRole !== '1') {
                    throw new Error('Access denied. Only lecturers and admins can view submissions.');
                }

                // API call to fetch the submissions data, including the Authorization token
                const response = await axios.get('http://localhost:8000/lecturer/submissions', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // Update the state with the fetched submissions data
                setSubmissions(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                // Handle any errors during the fetch process and display an error message
                console.error('Error fetching submissions:', err);
                setError(err.message || 'Failed to load submissions. Please try again.');
                setLoading(false); // Stop loading on error
            }
        };

        // Trigger the fetchSubmissions function
        fetchSubmissions();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    // If loading state is true, display a loading message
    if (loading) return <div className="loading-message">Loading...</div>;

    // If there is an error, display the error message
    if (error) return <div className="error-message">{error}</div>;

    // Main render: Display the list of submitted assignments
    return (
        <div className="submissions-list-container">
            <h2 className="submissions-list-title">Submitted Video Assignments</h2>
            {submissions.length === 0 ? (
                // If there are no submissions, display a message
                <p>No submitted assignments found.</p>
            ) : (
                // Map through the submissions array and render each submission as a clickable link
                <div>
                    {submissions.map((submission) => (
                        <Link 
                            key={submission._id} // Unique key for each submission
                            to={`/submission/${submission._id}`} // Link to a detailed view of the submission
                            className="submission-item"
                        >
                            <div>
                                {/* Display the assignment title and student name */}
                                <h5>{submission.assignment.title}</h5>
                                <small>Submitted by: {submission.student.first_name} {submission.student.last_name}</small>
                            </div>
                            <span className="view-badge">View</span> {/* Badge or button to view details */}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SubmittedAssignmentsList; // Export the component for use in other parts of the app
