import React, { useState } from "react"; // Importing React and useState hook for state management
import { Link } from "react-router-dom"; // Importing Link for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import '../../styles/lg.css'; // Importing custom CSS file
import '../../styles/animations.css'; // Importing custom CSS for animations

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
                    <img src="../media/nwuHeading.png" alt="Logo" className="mr-2" style={{ width: '50px', height: '50px', paddingTop: '5px' }} />
                    <h1 className="m-0 text-uppercase" style={{ color: '#5e489d' }}>
                    <i className="fa fa-book-reader mr-3" style={{ fontSize: 'small', color: '#5e489d' }}></i>North West University
                    </h1>
                </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                    <div className="navbar-nav mx-auto py-0">
                    <Link to="/" className="nav-item nav-link active">Home</Link>
                    </div>
                </div>
                </nav>
            </div>
            {/* Navbar End */}

            <div className="d-flex justify-content-center align-items-center bg-white vh-75 fade-in">
                <div className="bg-white p-3 rounded w-25 animated-container"> 
                    <h2 style={{ color: '#5e489d' }}><center>Sign Up</center></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName"><strong>First Name</strong></label>
                            <input type="text" 
                                   placeholder='Enter First Name' 
                                   autoComplete='off' 
                                   name='firstName' 
                                   className='form-control rounded-3' 
                                   onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName"><strong>Last Name</strong></label>
                            <input type="text" 
                                   placeholder='Enter Last Name' 
                                   autoComplete='off' 
                                   name='lastName' 
                                   className='form-control rounded-3' 
                                   onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="role"><strong>Role</strong></label>
                            <input type="text" 
                                   placeholder='Enter Role (e.g., 2)' 
                                   autoComplete='off' 
                                   name='role' 
                                   className='form-control rounded-3' 
                                   onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-3 hover-effect" // Changed to rounded-3 for more curves
                                style={{backgroundColor: '#5e489d', color:'white', transition: 'transform 0.2s'}} // Added transition for animation
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} // Animation on click
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset scale
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-3 text-decoration-none">
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Signup;
