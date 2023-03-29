import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  sendEmailVerification,
  verifyUserEmail,
} from "../services/user.service";

const VerifyEmail = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("oobCode")) {
      verifyUserEmail(searchParams.get("oobCode"), currentUser)
        .then((res) => res.code === 200 && navigate("/profile"))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const handleSendVerificationEmail = () => {
    sendEmailVerification(currentUser);
  };

  return (
    <div>
      VerifyEmail
      <button onClick={handleSendVerificationEmail}>Send Email Again</button>
    </div>
  );
};

export default VerifyEmail;
