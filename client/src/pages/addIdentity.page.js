import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar.component";

import { variables } from "../utils/constants";
import { setSidebarIndex } from "../redux/actions";
import { Avatar } from "../utils/images.util";
import {
  storeUserIdentity,
  updateIdentityAvatar,
  uploadToIpfs,
} from "../services/identity.service";
import moment from "moment";

const AddIdentity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, walletAddress } = useSelector((state) => state);

  const types = ["Email", "Banking", "Social Media"];

  const [newFields, setNewFields] = useState([
    { key: "Field Name", value: "Field Value" },
  ]);
  const [type, setType] = useState(types[0]);
  // eslint-disable-next-line
  const [imgSrc, setImgSrc] = useState("");
  const [selectedImageAsUrl, setSelectedImageAsUrl] = useState();
  const [title, setTitle] = useState("");

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(
    !walletAddress ? "Please connect your wallet." : undefined
  );
  const [success, setSuccess] = useState(undefined);

  useEffect(() => {
    dispatch(setSidebarIndex(1));
    // eslint-disable-next-line
  }, []);

  const getFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImgSrc(e.target.files[0]);
      setSelectedImageAsUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    if (
      newFields[0].key === "Field Name" ||
      newFields[0].value === "Field Value"
    ) {
      setError("Please provide valid details");
    } else {
      setProcessing(true);

      const url = await updateIdentityAvatar(imgSrc);

      await uploadToIpfs(
        JSON.stringify({
          pinataOptions: {
            cidVersion: 1,
          },
          pinataContent: {
            fields: newFields,
            image_src: url.data,
            title: title,
            uid: currentUser.uid,
            address: walletAddress,
            type: type,
            status: "Approved",
            created_on: moment().format("DD/MM/YYYY HH:mm"),
          },
        })
      )
        .then(async (res) => {
          const ipfsHash = res.data;
          storeUserIdentity(ipfsHash, walletAddress).then((result) => {
            if (result) {
              setProcessing(false);
              navigate("/identities");
            }
          });
        })
        .catch((err) => {
          setProcessing(false);
          setError(err.data);
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

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container my-5 profile">
        <div className="row gap-3">
          <div className="col-3 d-none d-lg-block">
            <Sidebar />
          </div>
          <div className="vr" />
          <div className="col single-identity-wrapper">
            <div className="hstack gap-3 align-items-start">
              <Link to={"/identities"}>
                <i className="fa-solid fa-circle-arrow-left" />
              </Link>
              <div>
                <h2>Add New Identity</h2>
                <p>Create a new identity here</p>
              </div>
            </div>
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
                        alt="identity-avatar"
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
                <p className="col-sm-3 my-auto">Title</p>
                <div className="col-sm-6 position-relative">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>
              {newFields.map((f, index) => (
                <div key={index} className="form-group row mb-3">
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      style={{
                        background: "none",
                        fontSize: 18,
                        fontWeight: 500,
                        color: variables.dark,
                      }}
                      placeholder={f.key}
                      onChange={(e) => {
                        setNewFields(
                          newFields.map(
                            (uF) => f === uF && { ...uF, key: e.target.value }
                          )
                        );
                      }}
                      value={f.key}
                    />
                  </div>
                  <div className="col-sm-6 position-relative">
                    <div className="hstack gap-3">
                      <input
                        type="text"
                        className="form-control shadow-none"
                        placeholder={f.value}
                        onChange={(e) => {
                          setNewFields(
                            newFields.map(
                              (uF) =>
                                f === uF && { ...uF, value: e.target.value }
                            )
                          );
                        }}
                        value={f.value}
                      />
                      <button
                        className={`btn btn-${
                          index === 0 ? "success" : "danger"
                        }`}
                        onClick={() =>
                          index === 0
                            ? setNewFields([
                                ...newFields,
                                { key: "Field Name", value: "Field Value" },
                              ])
                            : setNewFields(newFields.filter((rF) => f !== rF))
                        }
                      >
                        {index === 0 ? (
                          <i
                            className="fa-solid fa-circle-plus"
                            style={{
                              fontSize: 18,
                              color: "inherit",
                              margin: 0,
                              marginLeft: 5,
                            }}
                          />
                        ) : (
                          <i
                            className="fa-solid fa-circle-minus"
                            style={{
                              fontSize: 18,
                              color: "inherit",
                              margin: 0,
                              marginLeft: 5,
                            }}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group row mb-3">
                <p className="col-sm-3 my-auto">Type</p>
                <div className="col-sm-6 position-relative">
                  <select
                    className="form-select shadow-none form-control"
                    onChange={(e) => setType(e.target.value)}
                    defaultValue={type}
                  >
                    {types.map((c, id) => (
                      <option key={id} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={processing || !walletAddress}
            >
              Submit
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
  );
};

export default AddIdentity;
