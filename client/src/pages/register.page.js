import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/user.service";
import moment from "moment";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [processing, setProcessing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!firstName || !/[a-z]/i.test(firstName) || firstName.length < 2) {
      setError("A valid first name is required");
    } else if (!lastName || !/[a-z]/i.test(lastName) || lastName.length < 2) {
      setError("A valid last name is required");
    } else if (
      !dob ||
      !moment(dob, "DD/MM/YYYY", true).isValid() ||
      moment().diff(moment(dob, "DD/MM/YYYY"), "years") < 14
    ) {
      setError(
        "A valid birthday is required and you must atleast be of age 14"
      );
    } else if (!phoneNumber || phoneNumber.length !== 9) {
      setError("A valid phone number is required");
    } else if (
      !email
      // ||
      // !email.match(/\b[A-Za-z0-9._%+-]+@(gmail|yahoo|hotmail)\.(com|net|org)\b/)
    ) {
      setError("A valid gmail/yahoo/hotmail email is required");
    } else if (
      !password ||
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
    ) {
      setError(
        "A mix of uppercase, lowercase, numbers and symbols of atleast 6 characters is required for the password."
      );
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
        password: password,
      })
        .then((res) => {
          setSuccess(res.data);
          setProcessing(false);
          setFirstName("");
          setLastName("");
          setDob("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            navigate("/verify-email");
          }, 1000);
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
        <div className="input-group input-wrapper mt-3">
          <div class="input-group-prepend">
            <span
              class="input-group-text h-100"
              id="basic-addon1"
              style={{ borderRadius: "12px 0 0 12px" }}
            >
              +94
            </span>
          </div>
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ""))}
            maxLength={9}
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
  );
};

export default Register;
