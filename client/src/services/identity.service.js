const IdentityRepository = require("../repositories/identity.repository");

const getUserIdentities = (walletAddress) => {
  return IdentityRepository.getUserIdentities(walletAddress);
};

const storeUserIdentity = (ipfsHash, walletAddress) => {
  return IdentityRepository.storeUserIdentity(ipfsHash, walletAddress);
};

const updateUserIdentity = (oldIpfsHash, newIpfsHash, walletAddress) => {
  return IdentityRepository.updateUserIdentity(
    oldIpfsHash,
    newIpfsHash,
    walletAddress
  );
};

const removeUserIdentity = (ipfsHash, walletAddress) => {
  return IdentityRepository.removeUserIdentity(ipfsHash, walletAddress);
};

const getIdentities = () => {
  return IdentityRepository.getIdentities();
};

const createIdentity = (data) => {
  return IdentityRepository.createIdentity(data);
};

const updateIdentity = (data) => {
  return IdentityRepository.updateIdentity(data);
};

const uploadToIpfs = (data) => {
  return IdentityRepository.uploadToIpfs(data);
};
const retrieveFromIpfs = (ipfsHash) => {
  return IdentityRepository.retrieveFromIpfs(ipfsHash);
};

const removeFromIpfs = (ipfsHash) => {
  return IdentityRepository.removeFromIpfs(ipfsHash);
};

const updateIdentityAvatar = (avatar) => {
  return IdentityRepository.updateIdentityAvatar(avatar);
};

export {
  getUserIdentities,
  storeUserIdentity,
  updateUserIdentity,
  removeUserIdentity,
  getIdentities,
  createIdentity,
  updateIdentity,
  uploadToIpfs,
  retrieveFromIpfs,
  removeFromIpfs,
  updateIdentityAvatar,
};
