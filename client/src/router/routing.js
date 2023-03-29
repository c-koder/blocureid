import { useEffect, useState } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentUser } from "../redux/actions";
import { getUser } from "../services/user.service";
import { auth } from "../config/firebase.config";

import Home from "../pages/home.page";
import Profile from "../pages/profile.page";
import Admin from "../pages/admin.page";
import VerifyEmail from "../pages/verifyEmail.page";

const Routing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await getUser("uid", user.uid).then((res) => {
          dispatch(setCurrentUser(res.data[user.uid]));
          setLoading(false);
        });
      } else {
        dispatch(setCurrentUser(undefined));
        setLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    currentUser && !currentUser.email_verified && navigate("/verify-email");
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    !loading && (
      <>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/verify-email"
            element={
              currentUser && !currentUser.email_verified ? (
                <VerifyEmail />
              ) : (
                <Navigate to="/profile" />
              )
            }
          />
          <Route
            exact
            path="/profile"
            element={
              currentUser && currentUser.email_verified ? (
                <Profile />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </>
    )
  );
};

export default Routing;
