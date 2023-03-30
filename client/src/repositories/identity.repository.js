import {
  ref,
  get,
  set,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";

import moment from "moment";

import { auth, db } from "../config/firebase.config";

const getIdentities = async () => {
  return new Promise(async (resolve, reject) => {
    // To be updated
    if (auth.currentUser.uid === "") {
      await get(ref(db, "identities/"))
        .then((snapshot) => resolve({ code: 200, data: snapshot.val() }))
        .catch((err) => reject({ code: 500, data: err.message }));
    } else {
      reject({ code: 403, data: "Unauthorized access" });
    }
  });
};

const createIdentity = async (data) => {
  return new Promise(async (resolve, reject) => {
    if (
      data.uid &&
      data.type &&
      Object.keys(data).length > 2 &&
      data.wallet_address
    ) {
      const query = push(ref(db, `identities/${auth.currentUser.uid}`), {
        ...data,
        status: "pending",
        added_date: moment().format("YYYY-MM-DD HH:mm").toString(),
      });
      set(query)
        .then(() =>
          resolve({
            code: 200,
            data: "Identity created, pending for approval.",
          })
        )
        .catch((err) => reject({ code: 500, data: err.code }));
    } else {
      reject({ code: 422, data: "Missing values" });
    }
  });
};

const updateIdentity = async (data) => {
  return new Promise(async (resolve, reject) => {
    update(ref(db, `identities/${auth.currentUser.uid}/${data.id}`), {
      ...data,
      last_updated: moment().format("YYYY-MM-DD HH:mm").toString(),
    })
      .then((res) => resolve({ code: 200, data: res }))
      .catch((err) => reject({ code: 500, data: err.message }));
  });
};

export { createIdentity, getIdentities, updateIdentity };
