import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  sendEmailVerification,
  verifyUserEmail,
} from "../services/user.service";
import { Logo } from "../utils/images.util";

const VerifyEmail = () => {
  const currentUser = useSelector((state) => state.currentUser);

  let [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    if (searchParams.get("oobCode")) {
      verifyUserEmail(searchParams.get("oobCode"), currentUser)
        .then((res) => {
          if (res.code === 200) {
            window.location.reload();
          } else {
            setError("An unknown error occured.");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(
    "Verification email sent, check your inbox."
  );

  const handleSendVerificationEmail = () => {
    setLoading(true);
    sendEmailVerification(currentUser)
      .then((res) => {
        setSuccess(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.data);
        setLoading(false);
      });
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
    <div className="min-vh-100 d-flex flex-column justify-content-center text-center">
      <div className="container">
        <h2>Verify your email</h2>
        {loading && (
          <>
            <img
              src={Logo}
              alt="logo-dark-loader"
              className="loader-img"
              style={{ width: 50 }}
            />
            <br />
          </>
        )}
        <button
          disabled={loading}
          className="btn btn-primary mt-3"
          onClick={handleSendVerificationEmail}
        >
          Send Email Again
        </button>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success mt-3" role="alert">
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
