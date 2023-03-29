var DigitalIdentity = artifacts.require("./DigitalIdentity");

module.exports = function (deployer) {
  deployer.deploy(DigitalIdentity);
};
