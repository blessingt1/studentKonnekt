import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/styles.css'; // Ensure correct path for the CSS file
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation hook

function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', due_date: '', subject: '' }); // Changed dueDate to due_date
    const [editingAssignmentId, setEditingAssignmentId] = useState(null);
    const navigate = useNavigate(); // Hook for navigating programmatically
    const location = useLocation(); // Hook to access the current location

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const role = localStorage.getItem('role'); // Get the role from localStorage


        /*
        // Redirect if user is not a lecturer
        if (!token || role !== '1') {
            alert("Access denied. Only lecturers can view assignments.");
            navigate("/login"); // Redirect to login if not authorized
            return;
        }*/

        // Fetch assignments with authentication
        axios.get("http://localhost:8000/assignments", {
            headers: {
                Authorization: `Bearer ${token}` // Attach token in request header
            }
        })
        .then(response => {
            setAssignments(response.data); // Update the state with fetched assignments
        })
        .catch(error => console.log("Error fetching assignments:", error));

        // Scroll to assignments table if the URL hash is #assignments-table
        if (location.hash === '#assignments-table') {
            window.scrollTo({
                top: document.getElementById('assignments-table').offsetTop,
                behavior: 'smooth',
            });
        }
    }, [navigate, location]);

    // Fetch assignments
    const fetchAssignments = () => {
        // ... existing fetch logic ...
    };

    // Handle input changes for form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission for creating or updating assignments
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const userId = localStorage.getItem('userId'); // Assuming you store the user ID in localStorage

        try {
            if (editingAssignmentId) {
                // Update assignment
                await axios.put(`http://localhost:8000/assignments/${editingAssignmentId}`, {
                    ...formData,
                    updatedBy: userId // Include updatedBy field
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Assignment updated');
            } else {
                // Create new assignment
                await axios.post('http://localhost:8000/assignments', {
                    ...formData,
                    createdBy: userId // Include createdBy field
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('New assignment created');
            }
            setFormData({ title: '', description: '', due_date: '', subject: '' }); // Changed dueDate to due_date
            setEditingAssignmentId(null);
            fetchAssignments(); // Refresh assignment list
        } catch (error) {
            console.error('Error saving assignment:', error.response ? error.response.data : error.message); // Log the error
            alert('Error saving assignment: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    // Handle edit button click
    const handleEdit = (assignment) => {
        setFormData({
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            subject: assignment.subject,
        });
        setEditingAssignmentId(assignment._id);
    };

    // Handle delete button click
    const handleDelete = async (assignmentId, e) => {
        e.stopPropagation(); // Prevent triggering row click
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
        try {
            await axios.delete(`http://localhost:8000/assignments/${assignmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { deletedBy: userId } // Pass the deletedBy field
            });
            alert('Assignment deleted');
            fetchAssignments(); // Refresh assignment list
        } catch (error) {
            alert('Error deleting assignment: ' + error.response.data.error || error.message);
        }
    };

    // Update the handleUserListClick function to scroll to the assignments table
    const handleUserListClick = () => {
        const assignmentsTable = document.getElementById('assignments-table');
        if (assignmentsTable) {
            assignmentsTable.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
         {/* Topbar Start */}
         <div className="container-fluid bg-dark">
            <div className="row py-2 px-lg-5">
                <div className="col-lg-6 text-left mb-2 mb-lg-0">
                    <div className="d-inline-flex align-items-left text-white">
                        <small><i className="contact"></i>(+27 18) 299 1111</small>
                        <small className="contact mx-2">|</small>
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
                        <i className="fa fa-book-reader mr-3" style={{ fontSize: 'small', color: '#5e489d' }}></i>Assignment Management
                    </h1>
                </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                    <div className="navbar-nav mx-auto py-0">
                        <Link to="/" className="nav-item nav-link active" style={{ color: 'black' }}>Home</Link>
                        <Link to="#assignments-table" className="nav-item nav-link" onClick={handleUserListClick}>View Assignments</Link>
                    </div>
                </div>
            </nav>
        </div>
        {/* Navbar End */}

        {/* Add margin for spacing */}
        <div style={{ margin: '20px 0' }}></div> {/* Added spacing here */}

        {/* Form for creating or editing assignments */}
        <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 shadow rounded">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="date"
                    className="form-control"
                    name="due_date" // Changed from dueDate to due_date
                    value={formData.due_date} // Changed from dueDate to due_date
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                />
            </div>
            <button
                type="submit"
                className="btn btn-success w-100 rounded-3 hover-effect"
                style={{ backgroundColor: '#5e489d', color: 'white' }}
            >
                {editingAssignmentId ? 'Update Assignment' : 'Create Assignment'}
            </button>
        </form>

        <div style={{ height: '500px' }}></div>


        <div className="assignments-table">
        {/* Assignments Table */}
        <h2 id="assignments-table" className="text-center mb-4" style={{ color: '#5e489d' }}>Assignments List</h2> {/* Added header for assignments table */}
        <table className="table table-striped table-hover"> {/* Added table-hover for hover effect */}
            <thead className="thead-dark"> {/* Dark header for better contrast */}
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Subject</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                        <tr key={assignment._id} onClick={() => handleRowClick(assignment._id)} className="table-row-hover">
                            <td>{assignment.title}</td>
                            <td>{assignment.description}</td>
                            <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                            <td>{assignment.subject}</td>
                            <td>
                                <button onClick={(e) => { e.stopPropagation(); handleEdit(assignment); window.scrollTo(0, 0); }} className="btn btn-warning mr-2" style={{ backgroundColor: '#5e489d', color: 'white' }}>Edit</button>
                                <button onClick={(e) => handleDelete(assignment._id, e)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No assignments found</td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>

        <div style={{ height: '450px' }}></div>

        </>
    );
}

export default AssignmentsPage;
