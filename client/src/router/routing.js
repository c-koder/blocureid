import { useEffect, useState } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Web3 from "web3";

import {
  setCurrentNav,
  setCurrentUser,
  setWalletAddress,
} from "../redux/actions";
import { getUser } from "../services/user.service";
import { auth } from "../config/firebase.config";

import Navbar from "../components/navbar.component";
import Home from "../pages/home.page";
import Profile from "../pages/profile.page";
import Identities from "../pages/identities.page";
import Identity from "../pages/identity.page";
import AddIdentity from "../pages/addIdentity.page";
import Settings from "../pages/settings.page";
import Logout from "../pages/logout.page";
import Login from "../pages/login.page";
import Register from "../pages/register.page";
import Admin from "../pages/admin.page";
import VerifyEmail from "../pages/verifyEmail.page";
import Footer from "../components/footer.component";
import Loader from "../components/loader.component";

const web3 = new Web3(window.ethereum);

const Routing = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const { currentUser, walletAddress } = useSelector((state) => state);

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
    !walletAddress &&
      (async () => {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
          await ethereum
            .request({
              method: "eth_requestAccounts",
            })
            .then(async () => {
              const accounts = await web3.eth.getAccounts();

              dispatch(setWalletAddress(accounts[0]));

              ethereum.on("accountsChanged", (accounts) => {
                dispatch(setWalletAddress(accounts[0]));
              });
            })
            .catch(() => alert("Failed to connect wallet."));
        } else {
          alert("Install Metamask.");
        }
      })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("login") || path.includes("verify-email")) {
      dispatch(setCurrentNav(1));
    } else if (path.includes("register")) {
      dispatch(setCurrentNav(2));
    } else if (
      path.includes("profile") ||
      path.includes("identities") ||
      path.includes("identity") ||
      path.includes("settings") ||
      path.includes("logout")
    ) {
      dispatch(setCurrentNav(3));
    } else {
      dispatch(setCurrentNav(0));
    }
    // eslint-disable-next-line
  }, [location]);

  return !loading ? (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          exact
          path="/"
          element={
            currentUser && !currentUser.email_verified ? (
              <Navigate to="/verify-email" />
            ) : (
              <Home />
            )
          }
        />
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
        <Route
          exact
          path="/identities"
          element={
            currentUser && currentUser.email_verified ? (
              <Identities />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          exact
          path="/identity/:id"
          element={
            currentUser && currentUser.email_verified ? (
              <Identity />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          exact
          path="/add-identity"
          element={
            currentUser && currentUser.email_verified ? (
              <AddIdentity />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          exact
          path="/settings"
          element={
            currentUser && currentUser.email_verified ? (
              <Settings />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          exact
          path="/logout"
          element={
            currentUser && currentUser.email_verified ? (
              <Logout />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default Routing;
