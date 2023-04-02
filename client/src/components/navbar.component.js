import { LogoDark } from "../utils/images.util";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container">
        <a href="/" class="navbar-brand">
          <img src={LogoDark} height="28px" alt="navbar-logo" />
        </a>
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <div class="navbar-nav d-flex w-100 justify-content-center">
            <a href="#home" class="nav-item nav-link">
              Home
            </a>
            <a href="#features" class="nav-item nav-link">
              Features
            </a>
            <a href="#howitworks" class="nav-item nav-link">
              How It Works
            </a>
            <a href="#testimonials" class="nav-item nav-link">
              Testimonials
            </a>
            <a href="#contactus" class="nav-item nav-link">
              Contact Us
            </a>
          </div>
          <div class="navbar-nav ms-auto">
            <button type="button" class="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
