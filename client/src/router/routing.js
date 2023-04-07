import { useEffect, useState } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentNav, setCurrentUser } from "../redux/actions";
import { getUser } from "../services/user.service";
import { auth } from "../config/firebase.config";

import Navbar from "../components/navbar.component";
import Home from "../pages/home.page";
import Profile from "../pages/profile.page";
import Login from "../pages/login.page";
import Register from "../pages/register.page";
import Admin from "../pages/admin.page";
import VerifyEmail from "../pages/verifyEmail.page";
import Footer from "../components/footer.component";

const Routing = () => {
  const dispatch = useDispatch();
  const location = useLocation();

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
    const path = location.pathname;

    if (path.includes("login") || path.includes("verify-email")) {
      dispatch(setCurrentNav(1));
    } else if (path.includes("register")) {
      dispatch(setCurrentNav(2));
    } else {
      dispatch(setCurrentNav(0));
    }

    // eslint-disable-next-line
  }, [location]);

  return (
    !loading && (
      <>
        <Navbar />
        <Routes>
          <Route
            path="*"
            element={
              currentUser && !currentUser.email_verified ? (
                <Navigate to="/verify-email" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
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
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/profile" />}
          />
          <Route
            exact
            path="/register"
            element={!currentUser ? <Register /> : <Navigate to="/profile" />}
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
        <Footer />
      </>
    )
  );
};

export default Routing;
