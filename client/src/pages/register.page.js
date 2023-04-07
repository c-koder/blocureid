import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../services/user.service";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data.map((c) => c.name.common).sort());
      setLoading(false);
    });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!firstName) {
      setError("First name is required");
    } else if (!lastName) {
      setError("Last name is required");
    } else if (!dob) {
      setError("Birthday is required");
    } else if (country === "Country" || !country) {
      setError("Country is required");
    } else if (!phoneNumber) {
      setError("Phone number is required");
    } else if (!email) {
      setError("Email is required");
    } else if (!password) {
      setError("Password is required");
    } else if (!confirmPassword) {
      setError("Password confirmation is required");
    } else if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      setProcessing(true);
      await registerUser({
        first_name: firstName,
        last_name: lastName,
        dob: dob,
        email: email,
        phone_number: phoneNumber,
        country: country,
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
    !loading && (
      <div className="min-vh-100 d-flex flex-column justify-content-center">
        <div className="container register-wrapper">
          <h2 className="text-center">Create your BlocureID Account</h2>
          <div className="row mt-3">
            <div className="form-group input-wrapper col-6">
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
              />
            </div>
            <div className="form-group input-wrapper col-6">
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <div className="form-group input-wrapper mt-3">
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Enter your birthday (DD/MM/YYYY)"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required={true}
            />
          </div>
          <select
            className="form-select shadow-none form-control mt-3"
            onChange={(e) => setCountry(e.target.value)}
            defaultValue={country}
          >
            <option>Country</option>
            {countries.map((c, id) => (
              <option key={id} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="form-group input-wrapper mt-3">
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required={true}
            />
          </div>
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
          <div className="form-group input-wrapper mt-3">
            <input
              type="password"
              className="form-control shadow-none"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
            />
          </div>
          <button
            disabled={processing}
            className="btn btn-primary mt-3 w-100"
            onClick={handleRegister}
          >
            Register
          </button>
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

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    )
  );
};

export default Register;
