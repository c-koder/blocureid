import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../services/user.service";
import { LogoDark } from "../utils/images.util";

const Navbar = () => {
  const { currentNav, currentUser } = useSelector((state) => state);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        (currentNav === 0 || currentNav === 1) && "fixed-top"
      }`}
    >
      <div
        className={`container ${
          (currentNav === 1 || currentNav === 2) &&
          "d-flex justify-content-center"
        }`}
      >
        <a href="/" className="navbar-brand">
          <img
            src={LogoDark}
            height={currentNav === 0 ? "28px" : "36px"}
            alt="navbar-logo"
          />
        </a>
        {currentNav === 0 && (
          <>
            {!currentUser && (
              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
            {currentUser && (
              <div className="hstack gap-2">
                <Link to="/profile">
                  <button type="button" className="btn btn-icon">
                    <i className="fa-solid fa-circle-user" />
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              </div>
            )}
            {!currentUser && (
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
                  <Link to="/login">
                    <button type="button" className="btn btn-primary">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
