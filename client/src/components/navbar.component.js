import { LogoDark } from "../utils/images.util";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <a href="/" className="navbar-brand">
          <img src={LogoDark} height="28px" alt="navbar-logo" />
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <div className="navbar-nav d-flex w-100 justify-content-center">
            <a href="#home" className="nav-item nav-link">
              Home
            </a>
            <a href="#features" className="nav-item nav-link">
              Features
            </a>
            <a href="#howitworks" className="nav-item nav-link">
              How It Works
            </a>
            <a href="#testimonials" className="nav-item nav-link">
              Testimonials
            </a>
            <a href="#contactus" className="nav-item nav-link">
              Contact Us
            </a>
          </div>
          <div className="navbar-nav ms-auto">
            <button type="button" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
