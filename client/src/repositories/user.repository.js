import {
  ref,
  get,
  set,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
import {
  applyActionCode,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import moment from "moment";

import { auth, db } from "../config/firebase.config";

const getUser = async (by, value) => {
  return new Promise(async (resolve, reject) => {
    await get(query(ref(db, "users/"), orderByChild(by), equalTo(value)))
      .then((snapshot) => resolve({ code: 200, data: snapshot.val() }))
      .catch((err) => reject({ code: 500, data: err.message }));
  });
};

const registerUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        if (userCredential !== null || userCredential !== undefined) {
          set(ref(db, `users/${auth.currentUser.uid}`), {
            ...user,
            uid: auth.currentUser.uid,
            email_verified: false,
            joined_date: moment().format("YYYY-MM-DD HH:mm").toString(),
          })
            .then(() =>
              updateProfile(auth.currentUser, {
                displayName: `${user.firstName} ${user.lastName}`,
              })
                .then(() => {
                  sendUserVerifyEmail({ ...user, uid: auth.currentUser.uid })
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
                })
                .catch((err) => reject({ code: 500, data: err.code }))
            )
            .catch((err) => reject({ code: 500, data: err.code }));
        }
      })
      .catch((err) => reject({ code: 500, data: err.message }));
  });
};

const sendUserVerifyEmail = async (data) => {
  return new Promise(async (resolve, reject) => {
    await sendEmailVerification(auth.currentUser)
      .then(() => {
        updateUserDetails({
          ...data,
          verification_email_sent: moment()
            .format("YYYY-MM-DD HH:mm")
            .toString(),
        })
          .then(() => resolve({ code: 200, data: "Verification email sent" }))
          .catch((err) => reject({ code: 500, data: err.message }));
      })
      .catch((err) => reject({ code: 500, data: err.code }));
  });
};

const verifyUserEmail = async (oobCode, data) => {
  return new Promise(async (resolve, reject) => {
    await applyActionCode(auth, oobCode)
      .then(() => {
        updateUserDetails({
          ...data,
          verification_email_sent: null,
          email_verified: true,
        })
          .then(() => resolve({ code: 200, data: "Email verified" }))
          .catch((err) => reject({ code: 500, data: err.message }));
      })
      .catch((err) => reject({ code: 500, data: err.message }));
  });
};

const loginUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        if (userCredential !== null || userCredential !== undefined) {
          resolve({ code: 200, data: "Login successfull" });
        }
      })
      .catch((err) => reject({ code: 500, data: err.code }));
  });
};

const updateUserDetails = async (data) => {
  return new Promise(async (resolve, reject) => {
    update(ref(db, `users/${data.uid}`), {
      ...data,
      last_updated: moment().format("YYYY-MM-DD HH:mm").toString(),
    })
      .then((res) => resolve({ code: 200, data: res }))
      .catch((err) => reject({ code: 500, data: err.message }));
  });
};

const logout = async () => {
  return new Promise(async (resolve, reject) => {
    await signOut(auth);
    resolve({ code: 200, data: "Logged out successfully." });
  });
};

export {
  getUser,
  registerUser,
  sendUserVerifyEmail,
  verifyUserEmail,
  loginUser,
  updateUserDetails,
  logout,
};
