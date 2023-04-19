import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/sidebar.component";

import { setSidebarIndex } from "../redux/actions";
import Identity from "../components/identity.component";
import {
  getUserIdentities,
  retrieveFromIpfs,
} from "../services/identity.service";
import { Link } from "react-router-dom";
import { Logo } from "../utils/images.util";

const Identities = () => {
  const dispatch = useDispatch();

  const walletAddress = useSelector((state) => state.walletAddress);

  const [loading, setLoading] = useState(true);

  const [identities, setIdentities] = useState([]);

  useEffect(() => {
    dispatch(setSidebarIndex(1));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (walletAddress) {
      getUserIdentities(walletAddress)
        .then(async (res) => {
          if (res.length > 0) {
            let ids = [];
            await res.map(async (i) => {
              setLoading(true);
              let result = await retrieveFromIpfs(i);
              result = JSON.parse(Object.keys(result.data)[0]);
              result.pinataContent.id = i;
              ids.push(result);
              setLoading(false);
            });
            setIdentities(ids);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [walletAddress]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container my-lg-5 my-3 profile">
        <div className="row gap-3">
          <div className="col col-lg-3">
            <Sidebar />
          </div>
          <div className="vr" />
          <div className="col-lg col-md-auto profile-wrapper">
            <h2>Your Identities</h2>
            <p>Manage your identities here</p>
            <hr />
            {loading ? (
              <>
                <img
                  src={Logo}
                  alt="logo-dark-loader"
                  className="loader-img"
                  style={{ width: 50 }}
                />
                <br />
                <br />
              </>
            ) : (
              <div className="identities-wrapper mb-3">
                {identities.map((id, index) => (
                  <Identity key={index} data={id.pinataContent} />
                ))}
              </div>
            )}
            <Link to={"/add-identity"}>
              <button className="btn btn-success">Add New</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identities;
