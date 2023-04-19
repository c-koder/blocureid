const IdentityRepository = require("../repositories/identity.repository");

const getUserIdentities = (walletAddress) => {
  return IdentityRepository.getUserIdentities(walletAddress);
};

const storeUserIdentity = (ipfsHash, walletAddress) => {
  return IdentityRepository.storeUserIdentity(ipfsHash, walletAddress);
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

const updateIdentityInIpfs = (data) => {
  return IdentityRepository.updateIdentityInIpfs(data);
};

const updateIdentityAvatar = (avatar) => {
  return IdentityRepository.updateIdentityAvatar(avatar);
};

export {
  getUserIdentities,
  storeUserIdentity,
  removeUserIdentity,
  getIdentities,
  createIdentity,
  updateIdentity,
  uploadToIpfs,
  retrieveFromIpfs,
  updateIdentityInIpfs,
  updateIdentityAvatar,
};
