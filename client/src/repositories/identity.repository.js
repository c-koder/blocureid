import { ref, get, set, update, push } from "firebase/database";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

import moment from "moment";
import axios from "axios";

import Web3 from "web3";

import { auth, db, storage } from "../config/firebase.config";

import DigitalIdentityAbi from "../config/abi.json";

const web3 = new Web3(window.ethereum);
const contractAddress = "0x29C0331243580231bd058733A3EcBCc8B28EeB32";
const digitalIdentityContract = new web3.eth.Contract(
  DigitalIdentityAbi.abi,
  contractAddress
);

const storeUserIdentity = async (ipfsHash, walletAddress) => {
  return new Promise(async (resolve, reject) => {
    var gasAmount = digitalIdentityContract.methods
      .storeUserData(ipfsHash)
      .estimateGas({
        from: walletAddress,
      })
      .then((estimatedGas, err) => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");
        console.log(gasAmount);

        estimatedGas = Math.round(estimatedGas * 1.2);
        console.log("Gas limit estimation = " + estimatedGas + " units");

        digitalIdentityContract.methods
          .storeUserData(ipfsHash)
          .send({
            from: walletAddress,
            gas: estimatedGas,
          })
          .once("error", (err) => {
            reject({ code: 500, data: err });
          })
          .then((receipt) => {
            resolve({ code: 200, data: receipt });
          });
      })
      .catch(function (error) {
        console.log("estimateGas) - catch error");
        console.log(error);

        if (error.message.includes("insufficient funds")) {
          reject({ code: 500, data: "Insufficient funds." });
        }
      });
  });
};

const getUserIdentities = async (walletAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await digitalIdentityContract.methods
        .getUserData()
        .call({ from: walletAddress });
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const updateUserIdentity = async (oldIpfsHash, newIpfsHash, walletAddress) => {
  return new Promise(async (resolve, reject) => {
    var gasAmount = digitalIdentityContract.methods
      .updateUserData(oldIpfsHash, newIpfsHash)
      .estimateGas({
        from: walletAddress,
      })
      .then((estimatedGas, err) => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");
        console.log(gasAmount);

        estimatedGas = Math.round(estimatedGas * 1.2);
        console.log("Gas limit estimation = " + estimatedGas + " units");

        digitalIdentityContract.methods
          .updateUserData(oldIpfsHash, newIpfsHash)
          .send({
            from: walletAddress,
            gas: estimatedGas,
          })
          .once("error", (err) => {
            reject({ code: 500, data: err });
          })
          .then((receipt) => {
            resolve({ code: 200, data: receipt });
          });
      })
      .catch(function (error) {
        console.log("estimateGas) - catch error");
        console.log(error);

        if (error.message.includes("insufficient funds")) {
          reject({ code: 500, data: "Insufficient funds." });
        }
      });
  });
};

const removeUserIdentity = async (ipfsHash, walletAddress) => {
  return new Promise(async (resolve, reject) => {
    var gasAmount = digitalIdentityContract.methods
      .removeUserData(ipfsHash)
      .estimateGas({
        from: walletAddress,
      })
      .then((estimatedGas, err) => {
        console.log("----------------");
        console.log(err);
        console.log("----------------");
        console.log(gasAmount);

        estimatedGas = Math.round(estimatedGas * 1.2);
        console.log("Gas limit estimation = " + estimatedGas + " units");

        digitalIdentityContract.methods
          .removeUserData(ipfsHash)
          .send({
            from: walletAddress,
            gas: estimatedGas,
          })
          .once("error", (err) => {
            reject({ code: 500, data: err });
          })
          .then(async (receipt) => {
            await removeFromIpfs(ipfsHash)
              .then(() => resolve({ code: 200, data: receipt }))
              .catch((err) => reject({ code: 500, data: err }));
          });
      })
      .catch(function (error) {
        console.log("estimateGas) - catch error");
        console.log(error);

        if (error.message.includes("insufficient funds")) {
          reject({ code: 500, data: "Insufficient funds." });
        }
      });
  });
};

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
      Object.keys(data).length > 1 &&
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
      .get(`https://ipfs.io/ipfs/${ipfsHash}`)
      .then((res) => resolve({ code: 200, data: res.data }))
      .catch((err) => reject({ code: 500, data: err }));
  });
};

const removeFromIpfs = (ipfsHash) => {
  return new Promise(async (resolve, reject) => {
    axios
      .delete(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`, {
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
        },
      })
      .then(() => resolve({ code: 200, data: "Removed." }))
      .catch((err) => reject({ code: 500, data: err }));
  });
};

const updateIdentityAvatar = (avatar) => {
  return new Promise(async (resolve, reject) => {
    if (avatar !== null && avatar !== undefined && avatar !== "") {
      await uploadBytes(
        storageRef(storage, `identities/${Date.now()}.png`),
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

export {
  getUserIdentities,
  storeUserIdentity,
  updateUserIdentity,
  removeUserIdentity,
  createIdentity,
  getIdentities,
  updateIdentity,
  uploadToIpfs,
  retrieveFromIpfs,
  removeFromIpfs,
  updateIdentityAvatar,
};
