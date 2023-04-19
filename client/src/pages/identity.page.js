import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../components/loader.component";
import Sidebar from "../components/sidebar.component";

import { setSidebarIndex } from "../redux/actions";
import { Avatar } from "../utils/images.util";
import {
  removeUserIdentity,
  retrieveFromIpfs,
} from "../services/identity.service";

const Identity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const walletAddress = useSelector((state) => state.walletAddress);

  const { id } = useParams();

  const [identity, setIdentity] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    dispatch(setSidebarIndex(1));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      let result = await retrieveFromIpfs(id);
      result = JSON.parse(Object.keys(result.data)[0]);
      result.pinataContent.id = id;
      setIdentity(result.pinataContent);
      setLoading(false);
    })();
  }, [id]);

  const handleRemove = async () => {
    setProcessing(true);
    await removeUserIdentity(identity.id, walletAddress).then((result) => {
      if (result) {
        setProcessing(false);
        navigate("/identities");
      }
    });
  };

  return !loading && identity ? (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container my-5 profile">
        <div className="row gap-3">
          <div className="col-3 d-none d-lg-block">
            <Sidebar />
          </div>
          <div className="vr" />
          <div className="col-lg col-md-auto single-identity-wrapper">
            <div className="hstack gap-3 align-items-start">
              <Link to={"/identities"}>
                <i className="fa-solid fa-circle-arrow-left" />
              </Link>
              <div>
                <h2>ID: {identity.title}</h2>
                <p>Update your identity here</p>
              </div>
            </div>
            <hr />
            <div className="profile-form-wrapper">
              <div className="form-group row">
                <p className="col-sm-3 my-auto">Profile Photo</p>
                <div className="col-sm-9 position-relative">
                  <label className="avatar-input">
                    <input type="file" />
                    <figure className="avatar-figure">
                      <img src={Avatar} alt="update-avatar" />
                      <figcaption>
                        <img
                          src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                          alt="upload-icon"
                        />
                      </figcaption>
                    </figure>
                  </label>
                </div>
              </div>
              {identity.fields.map((field, id) => (
                <div key={id} className="form-group row mb-3">
                  <p className="col-sm-3 my-auto">{field.key}</p>
                  <div className="col-sm-6 position-relative">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      placeholder="First name"
                      value={field.value}
                      onChange={(e) =>
                        setIdentity({
                          ...identity,
                          fields: identity.fields.map((uF) => {
                            return {
                              ...uF,
                              value: uF === field && e.target.value,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="form-group row mb-3">
                <p className="col-sm-3 my-auto">Type</p>
                <div className="col-sm-6 position-relative">
                  <select
                    className="form-select shadow-none form-control"
                    defaultValue={identity.type}
                  >
                    <option>Email</option>
                    <option>Banking</option>
                    <option>Social Media</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div className="hstack gap-3">
              <button className="btn btn-primary" disabled={processing}>
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={handleRemove}
                disabled={processing}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Identity;
