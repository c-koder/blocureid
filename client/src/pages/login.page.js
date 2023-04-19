import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/user.service";
import { LoginImg } from "../utils/images.util";

const Login = () => {
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [processing, setProcessing] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) {
      setError("Email is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      setProcessing(true);
      await loginUser({
        email: email,
        password: password,
      })
        .then((res) => {
          setSuccess(res.data);
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

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center">
      <div className="container">
        <div className="row login-wrapper">
          <div className="col-md-auto login-form">
            <h2 className="text-center">Welcome Back!</h2>
            <div className="form-group input-wrapper mt-3">
              <input
                type="email"
                className="form-control shadow-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="form-group input-wrapper mt-3">
              <input
                type="password"
                className="form-control shadow-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="hstack gap-3 mt-3">
              <div className="d-flex gap-2">
                <input name="rememberCheckbox" type="checkbox" />
                <label htmlFor="rememberCheckbox" style={{ fontWeight: 500 }}>
                  Remember Credentials
                </label>
              </div>
              <Link to="/forgot-password" className="ms-auto">
                Forgot Password?
              </Link>
            </div>
            <button
              disabled={processing}
              className="btn btn-primary mt-3 w-100"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="mt-3 text-center">
              Don’t have an account? <Link to="/register">Sign up</Link>
            </p>
            {error && (
              <div className="alert alert-danger mt-3 w-100" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success mt-3 w-100" role="alert">
                {success}
              </div>
            )}
          </div>
          <div className="col-md-auto d-xl-block d-none">
            <img src={LoginImg} alt="login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
