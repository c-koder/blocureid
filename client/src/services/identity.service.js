const IdentityRepository = require("../repositories/identity.repository");

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

export {
  getIdentities,
  createIdentity,
  updateIdentity,
  uploadToIpfs,
  retrieveFromIpfs,
  updateIdentityInIpfs,
};
