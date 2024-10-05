import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; // Importing the CSS file

const Home = () => {
  const [isAssignmentsOpen, setAssignmentsOpen] = useState(false); // State for dropdown
  const [isAdminOpen, setAdminOpen] = useState(false); // State for admin dropdown

  const toggleAssignments = () => {
    setAdminOpen(false); // Close admin dropdown
    setAssignmentsOpen(!isAssignmentsOpen); // Toggle assignments dropdown
  };

  const toggleAdmin = () => {
    setAssignmentsOpen(false); // Close assignments dropdown
    setAdminOpen(!isAdminOpen); // Toggle admin dropdown
  };

  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-left text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-left text-white">
              <small><i className="contact"ß></i>(+27 18) 299 1111</small>
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
          <Link to="/" className="navbar-brand ml-lg-3 d-flex align-items-center"> {/* Added d-flex and align-items-center */}
            <img src="../media/nwuHeading.png" alt="Your Image Alt Text" className="mr-2" style={{width: '50px', height: '50px', paddingTop: '5px'}} /> 
            <h1 className="m-0 text-uppercase" style={{ color: '#5e489d' }}><i className="fa fa-book-reader mr-3" style={{ fontsize: 'small', color: '#5e489d' }}></i>North West University</h1>
          </Link>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
            <div className="navbar-nav mx-auto py-0">
              <Link to="/" className="nav-item nav-link active">Home</Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" onClick={toggleAdmin}>Admin</a>
                <div className={`dropdown-menu m-0 ${isAdminOpen ? 'show' : ''}`}> {/* Collapse class */}
                  <Link to="/admin/list" className="dropdown-item">List</Link>
                  <Link to="/admin/create" className="dropdown-item">Create</Link>
                  <Link to="/admin/update" className="dropdown-item">Update</Link>
                  <Link to="/admin/delete" className="dropdown-item">Delete</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" onClick={toggleAssignments}>Assignments</a>
                <div className={`dropdown-menu m-0 ${isAssignmentsOpen ? 'show' : ''}`}> {/* Collapse class */}
                  <Link to="/assignments/list" className="dropdown-item">List</Link>
                  <Link to="/assignments/create" className="dropdown-item">Create</Link>
                  <Link to="/assignments/update" className="dropdown-item">Update</Link>
                  <Link to="/assignments/delete" className="dropdown-item">Delete</Link>
                </div>
              </div>
              <a href="#about" className="nav-item nav-link">About</a>
            </div>
            <Link to="/login" className="btn btn-primary py-2 px-4 d-none d-lg-block">Log in</Link>
          </div>
        </nav>
      </div>
      {/* Navbar End */}








      {/* Header Start */}
      <div className="jumbotron jumbotron-fluid position-relative overlay-bottom" style={{ marginBottom: '90px', backgroundColor: '#5e489d' }}> {/* Updated background color */}
        <div className="container text-center my-5 py-5">
          <h1 className="text-white mt-4 mb-4" style={{ fontSize: 'rem' }}>HMS</h1>
          <h1 className="text-white display-1 mb-5" style={{ fontSize: '2.5rem' }}>Management Platform</h1> 
          <div className="mx-auto mb-5" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="input-group">
              <div className="input-group-prepend">
                <button className="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" type="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">Courses</button>
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
                <img className="position-absolute w-100 h-100" 
                    src="../../media/studentKonnekting.png" 
                    style={{ objectFit: 'contain', top: '0', left: '0' }} 
                    alt="About Us" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">About Us</h6>
                <h1 className="display-4">First Choice For Online Education Anywhere</h1>
              </div>
              <p>Student Konnekt is an innovative online platform designed to facilitate seamless communication and collaboration between students and lecturers at North-West University. Our platform supports user registration, authentication, assignment management, feedback submission, and student video submissions. Built using modern technologies like Node.js, Express.js, and MongoDB, Student Konnekt ensures secure, role-based access control and efficient handling of academic tasks.

Our mission is to make online education more accessible and efficient by offering students and lecturers a space where assignments can be managed, feedback can be provided, and learning materials can be shared seamlessly. With features like real-time feedback, video submissions, and assignment tracking, we aim to enhance the online learning experience and make education available anywhere, at any time.

We are committed to ensuring that our platform remains secure, scalable, and user-friendly, empowering both students and lecturers to focus on what matters most—education.</p>
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
