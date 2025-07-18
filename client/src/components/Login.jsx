import React, { useState } from "react"; // Importing React and useState hook for state management
import { Link } from "react-router-dom"; // Importing Link for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import '../../styles/styles.css'; // Importing custom CSS file
import '../../styles/animations.css'; // Importing custom CSS for animations
import nwuHeader from '../assets/images/nwuHeading.png'; // Importing NWU header image


function Login() {    
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [isAdminOpen, setIsAdminOpen] = useState(false); // State for admin panel toggle
    const [isAssignmentsOpen, setIsAssignmentsOpen] = useState(false); // State for assignments panel toggle
    const [userRole, setUserRole] = useState(null); // State to store the user's role
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault(); // Preventing the default form submission behavior

        if (!email || !password) {
            alert("Please fill in all fields"); // Alerting the user to fill in all fields
            return;
        }

        axios.post("https://studentkonnekt-backend-api.onrender.com/users/login", { email, password }) // Making a POST request to the login endpoint
            .then(result => {
                if (result.data.token) {
                    localStorage.setItem('token', result.data.token); // Store token
                    localStorage.setItem('userId', result.data.userId); // Store user ID
                    localStorage.setItem('role', result.data.role); // Store user ID

                    let roleValue = parseInt(result.data.role, 10); // Parse the role value as an integer
                    switch(roleValue){
                        case 0: roleValue = 'admin'; // Assigning role based on the value
                        break;
                        case 1: roleValue = 'lecturer'; // Assigning role based on the value
                        break;
                        case 2: roleValue = 'student'; // Assigning role based on the value
                        break;
                        default: roleValue = 'unknown'; 
                    }
                    setUserRole(roleValue); // Store the user's role
                    alert(`Login successful, ${roleValue} access granted!`); // Alerting the user of successful login with their role
                    navigate('/'); // Redirect to home after login
                } else {
                    alert(result.data.message || 'Login failed'); // Alerting the user if login fails
                }
            }).catch(error => {
                console.error('Login error:', error); // Handling any errors during the request
                alert('An error occurred during login.');
            });
    };


    const toggleAdmin = () => setIsAdminOpen(!isAdminOpen); // Function to toggle the admin panel
    const toggleAssignments = () => setIsAssignmentsOpen(!isAssignmentsOpen); // Function to toggle the assignments panel

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
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                    <a className="text-white px-2" href="#"><i className="fab fa-facebook-f"></i></a>
                    <a className="text-white px-2" href="#"><i className="fab fa-twitter"></i></a>
                    <a className="text-white px-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a className="text-white px-2" href="#"><i className="fab fa-instagram"></i></a>
                    <a className="text-white pl-2" href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
                </div>
            </div>
            {/* Topbar End */}

            {/* Navbar Start */}
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
                <Link to="/" className="navbar-brand ml-lg-3 d-flex align-items-center">
                    <img src={nwuHeader} alt="Logo" className="mr-2" style={{ width: '50px', height: '50px', paddingTop: '5px' }} />
                    <h1 className="m-0 text-uppercase" style={{ color: '#5e489d' }}>
                    <i className="fa fa-book-reader mr-3" style={{ fontSize: 'small', color: '#5e489d' }}></i>North West University
                    </h1>
                </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                </nav>
            </div>
            {/* Navbar End */}

            <div className="d-flex justify-content-center align-items-center bg-white vh-75 fade-in">
                <div className="bg-white p-3 rounded w-25 animated-container"> 
                    <h2 style={{ color: '#5e489d' }}><center>Login</center></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" 
                                   placeholder='Enter Email' 
                                   autoComplete='off' 
                                   name='email' 
                                   className='form-control rounded-3' 
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" 
                                   placeholder='Enter Password' 
                                   name='password' 
                                   className='form-control rounded-3' 
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-3 hover-effect" // Changed to rounded-3 for more curves
                                style={{backgroundColor: '#5e489d', color: 'white', transition: 'transform 0.2s'}} // Added transition for animation
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} // Animation on click
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset scale
                        >
                            Login
                        </button>
                    </form>
                    <p>Don't have an account?</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-3 hover-effect text-decoration-none">
                        Sign Up
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
