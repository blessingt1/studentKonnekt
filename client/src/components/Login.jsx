import React, { useState } from "react"; // Importing React and useState hook for state management
import { Link } from "react-router-dom"; // Importing Link for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import '../../styles/lg.css'; // Importing custom CSS file

function Login() {    
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [isAdminOpen, setIsAdminOpen] = useState(false); // State for admin panel toggle
    const [isAssignmentsOpen, setIsAssignmentsOpen] = useState(false); // State for assignments panel toggle
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault(); // Preventing the default form submission behavior

        if (!email || !password) {
            alert("Please fill in all fields"); // Alerting the user to fill in all fields
            return;
        }

        axios.post("http://localhost:8000/users/login", { email, password }) // Making a POST request to the login endpoint
            .then(result => {
                if (result.data.token) {
                    localStorage.setItem('token', result.data.token); // Store the token
                    // Optionally store the role if needed
                    localStorage.setItem('role', result.data.role); // Store the role if needed
                    navigate("/home"); // Navigating to the home page after successful login
                } else {
                    alert(result.data.message || "Login failed"); // Alerting the user if login fails
                }
            })
            .catch(err => {
                console.error(err); // Logging the error to the console
                alert("An error occurred during login. Please try again."); // Alerting the user of an error
            });
    };

    const toggleAdmin = () => setIsAdminOpen(!isAdminOpen); // Function to toggle the admin panel
    const toggleAssignments = () => setIsAssignmentsOpen(!isAssignmentsOpen); // Function to toggle the assignments panel

    return (
        <>
            {/* Topbar and Navbar (kept the same) */}

            <div className="d-flex justify-content-center align-items-center bg-white vh-75 fade-in">
                <div className="bg-white p-3 rounded w-25">
                    <h2 style={{ color: 'white' }}><center>Login</center></h2>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-success w-100 rounded-0 hover-effect" style={{backgroundColor: '#5e489d', color: 'white'}}>
                            Login
                        </button>
                    </form>
                    <p>Don't have an account?</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Sign Up
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
