import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/iStyle.css';

const Home = () => {
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center text-white">
              <small><i className="fa fa-phone-alt mr-2"></i>(+27 18) 299 1111</small>
              <small className="px-3">|</small>
              <small><i className="fa fa-envelope mr-2"></i>studies@nwu.ac.za</small>
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
          <Link to="/" className="navbar-brand ml-lg-3">
            <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-book-reader mr-3"></i>Student Konnekt</h1>
          </Link>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
            <div className="navbar-nav mx-auto py-0">
              <Link to="/" className="nav-item nav-link active">Home</Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Modules</a>
                <div className="dropdown-menu m-0">
                  <Link to="course.html" className="dropdown-item">CMPG321</Link>
                  <Link to="course.html" className="dropdown-item">CMPG323</Link>
                  <Link to="course.html" className="dropdown-item">CMPG324</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Lecturers</a>
                <div className="dropdown-menu m-0">
                  <Link to="course.html" className="dropdown-item">Henri</Link>
                  <Link to="course.html" className="dropdown-item">Heiki</Link>
                  <Link to="course.html" className="dropdown-item">Heystek</Link>
                </div>
              </div>
              <Link to="about.html" className="nav-item nav-link">About</Link>
              <Link to="contact.html" className="nav-item nav-link">Contact</Link>
            </div>
            <Link to="/login" className="btn btn-primary py-2 px-4 d-none d-lg-block">Log in</Link>
          </div>
        </nav>
      </div>
      {/* Navbar End */}








      {/* Header Start */}
      <div className="jumbotron jumbotron-fluid position-relative overlay-bottom" style={{ marginBottom: '90px' }}>
        <div className="container text-center my-5 py-5">
          <h1 className="text-white mt-4 mb-4">Learn on the Go</h1>
          <h1 className="text-white display-1 mb-5">Education Courses</h1>
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
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100" src="img/about.jpg" style={{ objectFit: 'cover' }} alt="About Us" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">About Us</h6>
                <h1 className="display-4">First Choice For Online Education Anywhere</h1>
              </div>
              <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt magna dolores aliquyam dolores dolore. Amet erat amet et magna</p>
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
