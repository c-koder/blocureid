import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "../components/sidebar.component";

import { setSidebarIndex } from "../redux/actions";

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebarIndex(2));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container my-lg-5 my-3 profile">
        <div className="row gap-3">
          <div className="col col-lg-3">
            <Sidebar />
          </div>
          <div className="vr" />
          <div className="col-lg col-md-auto profile-wrapper">
            <h2>Your Settings</h2>
            <p>Manage your account settings here</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
