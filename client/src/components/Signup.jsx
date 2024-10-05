import React, { useState } from "react"; // Importing React and useState hook for state management
import { Link } from "react-router-dom"; // Importing Link for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import '../../styles/lg.css'; // Importing custom CSS file

function Signup() {    
    const [firstName, setFirstName] = useState(''); // State for first name input
    const [lastName, setLastName] = useState(''); // State for last name input
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [role, setRole] = useState(''); // State for role input
    const [isAdminOpen, setIsAdminOpen] = useState(false); // State for admin panel toggle
    const [isAssignmentsOpen, setIsAssignmentsOpen] = useState(false); // State for assignments panel toggle

    const navigate = useNavigate(); // Using useNavigate hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault(); // Preventing the default form submission behavior

        if (!firstName || !lastName || !email || !password || !role) {
            alert("Please fill in all fields"); // Alerting the user to fill in all fields
            return;
        }

        axios.post("http://localhost:8000/users/register", { first_name: firstName, last_name: lastName, email, password, role }) // Making a POST request to the register endpoint
            .then(result => {
                alert("Registration successful!"); // Alerting the user of successful registration
                navigate("/login"); // Navigating to the login page after successful registration
            })
            .catch(err => {
                console.error(err); // Logging the error to the console
                alert("An error occurred during registration. Please try again."); // Alerting the user of an error
            });
    };

    const toggleAdmin = () => setIsAdminOpen(!isAdminOpen); // Function to toggle the admin panel
    const toggleAssignments = () => setIsAssignmentsOpen(!isAssignmentsOpen); // Function to toggle the assignments panel

    return (
        <>
            {/* Topbar and Navbar (kept the same) */}

            <div className="d-flex justify-content-center align-items-center bg-white vh-75 fade-in">
                <div className="bg-white p-3 rounded w-25">
                    <h2 style={{ color: '#5e489d' }}><center>Sign Up</center></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName"><strong>First Name</strong></label>
                            <input type="text" 
                                   placeholder='Enter First Name' 
                                   autoComplete='off' 
                                   name='firstName' 
                                   className='form-control rounded-0' 
                                   onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName"><strong>Last Name</strong></label>
                            <input type="text" 
                                   placeholder='Enter Last Name' 
                                   autoComplete='off' 
                                   name='lastName' 
                                   className='form-control rounded-0' 
                                   onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" 
                                   placeholder='Enter Email' 
                                   autoComplete='off' 
                                   name='email' 
                                   className='form-control rounded-0' 
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" 
                                   placeholder='Enter Password' 
                                   name='password' 
                                   className='form-control rounded-0' 
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role"><strong>Role</strong></label>
                            <input type="text" 
                                   placeholder='Enter Role (e.g., 2)' 
                                   autoComplete='off' 
                                   name='role' 
                                   className='form-control rounded-0' 
                                   onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-0 hover-effect" style={{backgroundColor: '#5e489d', color:'white'}}>
                            Sign Up
                        </button>
                    </form>
                    <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Signup;
