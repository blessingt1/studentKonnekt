import React, { useState, useEffect } from 'react'; // Added useEffect for tracking login state
import { Link, useNavigate } from 'react-router-dom'; // Correct imports
import '../../styles/styles.css'; // Importing the CSS file

const Home = () => {
  const [isAssignmentsOpen, setAssignmentsOpen] = useState(false); // State for Assignments dropdown
  const [isAdminOpen, setAdminOpen] = useState(false); // State for Admin dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Track login state
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  // Monitor changes to the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update login state based on token presence
  }, []); // Only run once when the component is mounted

  // Handle logout
  const handleLogout = () => {
      localStorage.removeItem('token'); // Clear the token
      alert("You have successfully logged out."); // Notify user
      setIsLoggedIn(false); // Update login state
      navigate("/"); // Redirect to home page
  };

  const toggleAssignments = () => {
    setAssignmentsOpen(!isAssignmentsOpen);
  };

  const toggleAdmin = () => {
    setAdminOpen(!isAdminOpen);
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
              <div>
                <Link to="/admin" className="nav-item nav-link">Admin</Link> 
              </div>
              <div>
                <Link to="/assignments" className="nav-item nav-link">Assignments</Link>  {/* @Kanayochi enter assignment page route */}  
              </div>
              <a href="#about" className="nav-item nav-link">About</a>
            </div>
            {isLoggedIn ? ( // Conditional rendering for login/logout
              <button onClick={handleLogout} className="btn btn-primary py-2 px-4 d-none d-lg-block">Logout</button>
            ) : (
              <Link to="/login" className="btn btn-primary py-2 px-4 d-none d-lg-block">Log in</Link>
            )}
          </div>
        </nav>
      </div>
      {/* Navbar End */}

      {/* Header Start */}
      <div className="jumbotron jumbotron-fluid position-relative overlay-bottom" style={{ marginBottom: '90px', backgroundColor: '#5e489d' }}>
        <div className="container text-center my-5 py-5">
          <h1 className="text-white mt-4 mb-4" style={{ fontSize: '2rem' }}>HMS</h1>
          <h1 className="text-white display-1 mb-5" style={{ fontSize: '2.5rem' }}>Management Platform</h1> 
          <div className="mx-auto mb-5" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="input-group">
              <div className="input-group-prepend">
                <button className="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Courses</button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">CMPG321</a>
                  <a className="dropdown-item" href="#">CMPG323</a>
                  <a className="dropdown-item" href="#">CMPG324</a>
                </div>
              </div>
              <input type="text" className="form-control border-light" style={{ padding: '21.6px 25px' }} placeholder="Keyword" />
              <div className="input-group-append">
                <button className="btn btn-secondary px-4 px-lg-5">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* About Start */}
      <div id="about" className="container-fluid py-5" style={{ backgroundColor: 'white' }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '200px', position: 'relative', paddingTop: '235px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100" src="../../media/studentKonnekting.png" style={{ objectFit: 'contain', top: '0', left: '0' }} alt="About Us" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">About Us</h6>
                <h1 className="display-4">First Choice For Online Education Anywhere</h1>
              </div>
              <p>Student Konnekt is an innovative online platform designed to facilitate seamless communication and collaboration between students and lecturers...</p>
              <div className="row pt-3 mx-0">
                <div className="col-3 px-0">
                  <div className="bg-success text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">4</h1>
                    <h6 className="text-uppercase text-white">Current<span className="d-block">Modules</span></h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-primary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">7</h1>
                    <h6 className="text-uppercase text-white">Assignments<span className="d-block">Due</span></h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-secondary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">3</h1>
                    <h6 className="text-uppercase text-white">Tests<span className="d-block">Scheduled</span></h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-warning text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">2</h1>
                    <h6 className="text-uppercase text-white">Events<span className="d-block">Scheduled</span></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  );
};

export default Home;
