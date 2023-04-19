import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import Sidebar from "../components/sidebar.component";
import Loader from "../components/loader.component";

import { Avatar } from "../utils/images.util";

import { setCurrentUser, setSidebarIndex } from "../redux/actions";
import { updateUserDetails } from "../services/user.service";

const Profile = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  const [selectedImageAsUrl, setSelectedImageAsUrl] = useState(
    currentUser.avatar || ""
  );
  const [updatedUser, setUpdatedUser] = useState(currentUser);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data.map((c) => c.name.common).sort());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(setSidebarIndex(0));
    // eslint-disable-next-line
  }, []);

  const getFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUpdatedUser({ ...updatedUser, avatar: e.target.files[0] });
      setSelectedImageAsUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    if (
      updatedUser.first_name === "" ||
      updatedUser.last_name === "" ||
      updatedUser.country === "" ||
      updatedUser.phone_number === ""
    ) {
      setError("All fields are required.");
    } else {
      setProcessing(true);
      updateUserDetails(updatedUser)
        .then((res) => {
          if (res.code === 200) {
            dispatch(setCurrentUser(updatedUser));
            setSuccess("Profile updated successfully.");
          } else {
            setError("An error occured when updating.");
          }
          setProcessing(false);
        })
        .catch((err) => {
          setError(err.data);
          setProcessing(false);
        });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setError(undefined);
    }, 3000);
    return () => clearInterval(timer);
  }, [error]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSuccess(undefined);
    }, 3000);
    return () => clearInterval(timer);
  }, [success]);

  return !loading ? (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container my-lg-5 my-3 profile">
        <div className="row gap-3">
          <div className="col col-lg-3">
            <Sidebar />
          </div>
          <div className="vr" />
          <div className="col-lg col-md-auto profile-wrapper">
            <h2>Your Profile</h2>
            <p>Update your personal details</p>
            <hr />
            <div className="profile-form-wrapper">
              <div className="form-group row">
                <p className="col-sm-3 my-auto">Profile Photo</p>
                <div className="col-sm-9 position-relative">
                  <label className="avatar-input">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={getFile}
                    />
                    <figure className="avatar-figure">
                      <img
                        src={selectedImageAsUrl || Avatar}
                        onError={() => setSelectedImageAsUrl("")}
                        alt="update-avatar"
                      />
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
              <div className="form-group row mb-3">
                <p className="col-sm-3 my-auto">First Name</p>
                <div className="col-sm-6 position-relative">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="First name"
                    value={updatedUser.first_name}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <p className="col-sm-3 my-auto">Last Name</p>
                <div className="col-sm-6 position-relative">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Last name"
                    value={updatedUser.last_name}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <p className="col-sm-3 my-auto">Country / Region</p>
                <div className="col-sm-6 position-relative">
                  <select
                    className="form-select shadow-none form-control"
                    defaultValue={updatedUser.country}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        country: e.target.value,
                      })
                    }
                  >
                    <option>Country</option>
                    {countries.map((c, id) => (
                      <option key={id} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row mb-3">
                <p className="col-sm-3 my-auto">Phone number</p>
                <div className="col-sm-6 position-relative">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Phone number"
                    value={updatedUser.phone_number}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        phone_number: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <hr />
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={processing}
            >
              Save
            </button>
            {error && (
              <div className="alert alert-danger mt-3 mx-0" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success mt-3 mx-0" role="alert">
                {success}
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

export default Profile;
