import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../components/loader.component";
import Sidebar from "../components/sidebar.component";

import { setSidebarIndex } from "../redux/actions";
import { Avatar } from "../utils/images.util";
import {
  removeFromIpfs,
  removeUserIdentity,
  retrieveFromIpfs,
  updateUserIdentity,
  uploadToIpfs,
} from "../services/identity.service";

const Identity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { walletAddress, currentIdentities } = useSelector((state) => state);

  const { id } = useParams();

  const [identity, setIdentity] = useState(undefined);
  const [tempIdentity, setTempIdentity] = useState(identity);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    dispatch(setSidebarIndex(1));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      console.log(currentIdentities);
      if (currentIdentities.map((cid) => cid.pinataContent.id === id)) {
        let result = await retrieveFromIpfs(id);
        result = JSON.parse(Object.keys(result.data)[0]);
        result.pinataContent.id = id;
        setIdentity(result);
        setTempIdentity(result);
        setLoading(false);
      } else {
        navigate("/identities");
      }
    })();
    // eslint-disable-next-line
  }, [id, currentIdentities]);

  const handleUpdate = async () => {
    if (identity.pinataContent === tempIdentity.pinataContent) {
      setError("No changes found.");
    } else {
      setProcessing(true);

      let newId = identity;
      const oldIpfsHash = identity.pinataContent.id;
      delete newId.pinataContent["id"];

      const newIpfsHash = await uploadToIpfs(JSON.stringify(newId));
      await removeFromIpfs(oldIpfsHash);
      await updateUserIdentity(oldIpfsHash, newIpfsHash.data, walletAddress)
        .then(() => {
          setProcessing(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleRemove = async () => {
    setProcessing(true);
    await removeUserIdentity(identity.pinataContent.id, walletAddress)
      .then(() => {
        setProcessing(false);
        navigate("/identities");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setError(undefined);
    }, 3000);
    return () => clearInterval(timer);
  }, [error]);

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
                <h2>ID: {identity.pinataContent.title}</h2>
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
              {identity.pinataContent.fields.map((field, id) => (
                <div key={id} className="form-group row mb-3">
                  <p className="col-sm-3 my-auto">{field.key}</p>
                  <div className="col-sm-6 position-relative">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      placeholder={field.key}
                      value={field.value}
                      onChange={(e) =>
                        setIdentity({
                          ...identity,
                          pinataContent: {
                            ...identity.pinataContent,
                            fields: identity.pinataContent.fields.map((uF) =>
                              uF === field
                                ? {
                                    ...uF,
                                    value: e.target.value,
                                  }
                                : uF
                            ),
                          },
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
                    defaultValue={identity.pinataContent.type}
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
              <button
                className="btn btn-primary"
                disabled={processing}
                onClick={handleUpdate}
              >
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
            {error && (
              <div className="alert alert-danger mt-3 mx-0" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Identity;
