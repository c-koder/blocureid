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

export { getIdentities, createIdentity, updateIdentity };
