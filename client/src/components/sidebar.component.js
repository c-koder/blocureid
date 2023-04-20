import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "../utils/images.util";

const Sidebar = () => {
  const { currentUser, sideBarIndex } = useSelector((state) => state);

  return (
    <div className="sidebar sticky-top">
      <div className="d-none d-lg-flex flex-column align-items-center">
        <div className="profile-img-wrapper">
          <img src={currentUser.avatar || Avatar} alt="profile-avatar" />
        </div>
        <h4>Welcome {currentUser.first_name}</h4>
      </div>
      <div className="btn-wrapper">
        <Link to="/profile">
          <button className={`btn ${sideBarIndex === 0 && "btn-primary"}`}>
            <i className="fa-regular fa-circle-user d-lg-none d-block" />
            <span className="d-none d-lg-block">Profile</span>
          </button>
        </Link>
        <Link to="/identities">
          <button className={`btn ${sideBarIndex === 1 && "btn-primary"}`}>
            <i className="fa-regular fa-address-card d-lg-none d-block" />
            <span className="d-none d-lg-block">Identities</span>
          </button>
        </Link>
        <Link to="/settings">
          <button className={`btn ${sideBarIndex === 2 && "btn-primary"}`}>
            <i className="fa-solid fa-gear d-lg-none d-block" />
            <span className="d-none d-lg-block">Settings</span>
          </button>
        </Link>
        <Link to="/logout">
          <button className={`btn ${sideBarIndex === 3 && "btn-primary"}`}>
            <i className="fa-solid fa-arrow-right-from-bracket d-lg-none d-block" />
            <span className="d-none d-lg-block">Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
