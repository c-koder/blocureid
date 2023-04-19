import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "../components/sidebar.component";

import { setSidebarIndex } from "../redux/actions";
import { logout } from "../services/user.service";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebarIndex(3));
    // eslint-disable-next-line
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container my-lg-5 my-3 profile">
        <div className="row gap-3">
          <div className="col col-lg-3">
            <Sidebar />
          </div>
          <div className="vr" />
          <div className="col-lg col-md-auto profile-wrapper">
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <hr />
            <button className="btn btn-primary" onClick={handleLogout}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
