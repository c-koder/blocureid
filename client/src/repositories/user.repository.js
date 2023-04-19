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
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import moment from "moment";

import { auth, db, storage } from "../config/firebase.config";

const getUser = (by, value) => {
  return new Promise(async (resolve, reject) => {
    await get(query(ref(db, "users/"), orderByChild(by), equalTo(value)))
      .then((snapshot) => resolve({ code: 200, data: snapshot.val() }))
      .catch((err) => reject({ code: 500, data: err.message }));
  });
};

const registerUser = (user) => {
  return new Promise(async (resolve, reject) => {
    if (
      user.first_name &&
      user.last_name &&
      user.dob &&
      user.email &&
      user.phone_number &&
      user.country &&
      user.password
    ) {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredential) => {
          if (userCredential !== null || userCredential !== undefined) {
            set(ref(db, `users/${auth.currentUser.uid}`), {
              ...user,
              uid: auth.currentUser.uid,
              email_verified: false,
              password: null,
              joined_date: moment().format("DD/MM/YYYY HH:mm").toString(),
            })
              .then(() =>
                updateProfile(auth.currentUser, {
                  displayName: `${user.first_name} ${user.last_name}`,
                })
                  .then(() =>
                    sendUserVerifyEmail({ ...user, uid: auth.currentUser.uid })
                      .then((res) => resolve(res))
                      .catch((err) => reject(err))
                  )
                  .catch((err) => reject({ code: 500, data: err.code }))
              )
              .catch((err) => reject({ code: 500, data: err.code }));
          }
        })
        .catch((err) => reject({ code: 500, data: err.message }));
    } else {
      reject({ code: 422, data: "Missing values" });
    }
  });
};

const sendUserVerifyEmail = (user) => {
  return new Promise(async (resolve, reject) => {
    if (
      user.verification_email_sent &&
      moment().diff(
        moment(user.verification_email_sent, "DD/MM/YYYY HH:mm"),
        "minutes"
      ) < 2
    ) {
      reject({
        code: 422,
        data: "Wait atleast 2 minutes before trying again.",
      });
    } else {
      console.log(user);
      if (
        user.first_name &&
        user.last_name &&
        user.dob &&
        user.email &&
        user.phone_number &&
        user.country
      ) {
        await sendEmailVerification(auth.currentUser)
          .then(() => {
            updateUserDetails({
              ...user,
              verification_email_sent: moment()
                .format("DD/MM/YYYY HH:mm")
                .toString(),
            })
              .then(() =>
                resolve({ code: 200, data: "Verification email sent" })
              )
              .catch((err) => reject({ code: 500, data: err.message }));
          })
          .catch((err) => reject({ code: 500, data: err.code }));
      } else {
        reject({ code: 422, data: "Missing values" });
      }
    }
  });
};

const verifyUserEmail = (oobCode, user) => {
  return new Promise(async (resolve, reject) => {
    if (
      oobCode &&
      user.uid &&
      user.first_name &&
      user.last_name &&
      user.email &&
      user.phone_number &&
      user.country
    ) {
      await applyActionCode(auth, oobCode)
        .then(() => {
          updateUserDetails({
            ...user,
            verification_email_sent: null,
            email_verified: true,
          })
            .then(() => resolve({ code: 200, data: "Email verified" }))
            .catch((err) => reject({ code: 500, data: err.message }));
        })
        .catch((err) => reject({ code: 500, data: err.message }));
    } else {
      reject({ code: 422, data: "Missing values" });
    }
  });
};

const loginUser = (user) => {
  return new Promise(async (resolve, reject) => {
    if (user.email && user.password) {
      await signInWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredential) => {
          if (userCredential !== null || userCredential !== undefined) {
            resolve({ code: 200, data: "Login successfull" });
          }
        })
        .catch((err) => reject({ code: 500, data: err.code }));
    } else {
      reject({ code: 422, data: "Missing values" });
    }
  });
};

const updateUserDetails = (user) => {
  return new Promise(async (resolve, reject) => {
    if (
      user.uid &&
      user.first_name &&
      user.last_name &&
      user.email &&
      user.phone_number &&
      user.country
    ) {
      let url = null;
      if (user.avatar) {
        url = await updateUserAvatar(user.avatar);
        user.avatar = url.data;
      }
      update(ref(db, `users/${user.uid}`), {
        ...user,
        last_updated: moment().format("DD/MM/YYYY HH:mm").toString(),
      })
        .then((res) => resolve({ code: 200, data: res }))
        .catch((err) => reject({ code: 500, data: err.message }));
    } else {
      reject({ code: 422, data: "Missing values" });
    }
  });
};

const updateUserAvatar = (avatar) => {
  return new Promise(async (resolve, reject) => {
    if (avatar !== null && avatar !== undefined && avatar !== "") {
      await uploadBytes(
        storageRef(storage, `avatars/${Date.now()}.png`),
        avatar,
        {
          contentType: "image/png",
        }
      ).then(async (snapshot) => {
        await getDownloadURL(storageRef(storage, snapshot.metadata.fullPath))
          .then((url) => resolve({ code: 200, data: url }))
          .catch((err) => reject({ code: 500, data: err.message }));
      });
    } else {
      reject({ code: 422, data: "Invalid Image" });
    }
  });
};

const logout = () => {
  return new Promise(async (resolve, reject) => {
    await signOut(auth)
      .then(() => resolve({ code: 200, data: "Logged out successfully." }))
      .catch((err) => reject({ code: 500, data: err.message }));
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
