import { ref, get, set, update, push } from "firebase/database";

import moment from "moment";
import axios from "axios";

import { auth, db } from "../config/firebase.config";

const getIdentities = () => {
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

const createIdentity = (data) => {
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

const updateIdentity = (data) => {
  return new Promise(async (resolve, reject) => {
    update(ref(db, `identities/${auth.currentUser.uid}/${data.id}`), {
      ...data,
      last_updated: moment().format("YYYY-MM-DD HH:mm").toString(),
    })
      .then((res) => resolve({ code: 200, data: res }))
      .catch((err) => reject({ code: 500, data: err.message }));
  });
};

// JSON.stringify({
//   pinataOptions: {
//     cidVersion: 1,
//   },
//   pinataMetadata: {
//     name: "<user_id>",
//     keyvalues: {
//       key: "value",
//       key2: "value",
//     },
//   },
//   pinataContent: {
//     somekey: "somevalue",
//   },
// });

const uploadToIpfs = (data) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
        },
      })
      .then((res) => resolve({ code: 200, data: res.data.IpfsHash }))
      .catch((err) => reject({ code: 500, data: err }));
  });
};

const retrieveFromIpfs = (ipfsHash) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
      .then((res) => resolve({ code: 200, data: res.data }))
      .catch((err) => reject({ code: 500, data: err }));
  });
};

// JSON.stringify({
//   ipfsPinHash: "CID",
//   name: "Name",
//   keyvalues: {
//     anewkeyk: "anewvalue",
//   },
// });

const updateIdentityInIpfs = (data) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .put("https://api.pinata.cloud/pinning/hashMetadata", data, {
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
        },
      })
      .then((res) => resolve({ code: 200, data: res.data }))
      .catch((err) => reject({ code: 500, data: err }));
  });
};

export {
  createIdentity,
  getIdentities,
  updateIdentity,
  uploadToIpfs,
  retrieveFromIpfs,
  updateIdentityInIpfs,
};
