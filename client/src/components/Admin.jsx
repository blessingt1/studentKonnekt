import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import '../../styles/styles.css'; // Importing custom CSS file

const Admin = ({ isLoggedIn, handleLogout }) => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', role: '0' });
    const [editingUserId, setEditingUserId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Get user role from localStorage
    const navigate = useNavigate();
    const [showScroll, setShowScroll] = useState(false); // State to control visibility of the button

    // Fetch users
    const fetchUsers = () => {
        axios.get("https://studentkonnekt-backend-api.onrender.com/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => alert("Error fetching users:", error));
    };

    useEffect(() => {
        if(role == 0){
            fetchUsers(); // Fetch users on component mount
        }else{
            alert("You do not have permission to access this page.");
            navigate("/home"); // Redirect to home if not authorized
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission for creating or updating users
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUserId) {
                // Update user
                await axios.put(`https://studentkonnekt-backend-api.onrender.com/users/${editingUserId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('User updated');
            } else {
                // Create new user
                await axios.post('https://studentkonnekt-backend-api.onrender.com/users', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('New user created');
            }
            setFormData({ first_name: '', last_name: '', email: '', password: '', role: '0' });
            setEditingUserId(null);
            fetchUsers(); // Refresh user list
        } catch (error) {
            alert('Error saving user:', error);
        }
    };

    // Handle edit button click
    const handleEdit = (user) => {
        setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: '',
            role: user.role.toString(),
        });
        setEditingUserId(user._id);
    };

    // Handle delete button click
    const handleDelete = async (userId, e) => {
        e.stopPropagation(); // Prevent triggering row click
        try {
            await axios.delete(`https://studentkonnekt-backend-api.onrender.com/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('User deleted');
            fetchUsers(); // Refresh user list
            setSelectedUserId(null);
        } catch (error) {
            alert('Error deleting user: ' + error.response.data.message || error.message); // Improved error handling
        }
    };

    // Handle row click to view user details and enable delete button
    const handleRowClick = (userId) => {
        navigate(`/users/${userId}`); // Redirect to detailed user page
        setSelectedUserId(userId); // Set the selected user for delete button state
    };

    // Add this function to handle scrolling to the user list section
    const handleUserListClick = () => {
        const userListSection = document.getElementById('userListSection');
        if (userListSection) {
            userListSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                <a href="#userListSection" className="nav-item nav-link" onClick={handleUserListClick}>View Users</a>
                </div>
            </div>
            </nav>
        </div>
        {/* Navbar End */}


        <div className="container-fluid bg-light"> {/* Changed to bg-light for consistency */}

            {/* Form for creating or editing users */}
            <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 shadow rounded"> {/* Added styling for form container */}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required={editingUserId === null}
                    />
                </div>
                <div className="form-group">
                    <select className="form-control" name="role" value={formData.role} onChange={handleChange}>
                        <option value="0">Admin</option>
                        <option value="1">Lecturer</option>
                        <option value="2">Student</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-success w-100 rounded-3 hover-effect"
                    style={{ backgroundColor: '#5e489d', color: 'white' }}
                >
                    {editingUserId ? 'Update User' : 'Create User'}
                </button>
            </form>

            {/* User list table */}
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>

            <h2 id="userListSection" className="text-center mb-4" style={{ color: '#5e489d' }}>User List</h2>
            <table className="table table-striped table-hover"> {/* Added table-hover for hover effect */}
                <thead className="thead-dark"> {/* Dark header for better contrast */}
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id} onClick={() => handleRowClick(user._id)} className="table-row-hover">
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={(e) => { e.stopPropagation(); handleEdit(user); window.scrollTo(0, 0); }} className="btn btn-warning mr-2" style={{ backgroundColor: '#5e489d', color: 'white' }}>Edit</button>
                                    <button onClick={(e) => handleDelete(user._id, e)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <div style={{ height: '450px' }}></div>

        {/* Back to Top Button */}
        {showScroll && (
            <button 
                onClick={scrollToTop} 
                className="back-to-top" 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s',
                    opacity: showScroll ? 1 : 0,
                }}
            >
                Back to Top
            </button>
        )}
        </>
    );
};

export default Admin;
