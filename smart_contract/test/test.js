const DigitalIdentity = artifacts.require("DigitalIdentity");

contract("DigitalIdentity", (accounts) => {
  let contractInstance;

  beforeEach(async () => {
    contractInstance = await DigitalIdentity.new({ from: accounts[0] });
  });

  it("should allow users to store IPFS hashes", () => {
    const ipfsHash = "QmXcY1jKMG8os4wLQ4ApKeKadM4oMUpKoqmPpX9gGcMP1a";
    return contractInstance
      .storeUserData(ipfsHash, { from: accounts[0] })
      .then(() => contractInstance.getUserDataCount({ from: accounts[0] }))
      .then((userDataCount) =>
        assert.equal(userDataCount, 1, "User data count should be 1")
      )
      .then(() => contractInstance.getUserData(0, { from: accounts[0] }))
      .then((storedIpfsHash) =>
        assert.equal(storedIpfsHash, ipfsHash, "Stored IPFS hash should match")
      );
  });

  it("should not allow users to store empty IPFS hashes", () => {
    const emptyHash = "";
    return contractInstance
      .storeUserData(emptyHash, { from: accounts[0] })
      .catch((error) =>
        assert(
          error.message.includes("IPFS hash cannot be empty"),
          "Error: IPFS hash should not be empty"
        )
      );
  });

  it("should not allow users to store invalid IPFS hashes", () => {
    const invalidHash = "12345";
    return contractInstance
      .storeUserData(invalidHash, { from: accounts[0] })
      .catch((error) =>
        assert(
          error.message.includes("Invalid IPFS hash format"),
          "Error: IPFS hash should be valid"
        )
      );
  });

  it("should only allow the respective owner to view their IPFS hashes", () => {
    const ipfsHash = "QmXcY1jKMG8os4wLQ4ApKeKadM4oMUpKoqmPpX9gGcMP1a";
    return contractInstance
      .storeUserData(ipfsHash, { from: accounts[0] })
      .then(() => contractInstance.getUserData(0, { from: accounts[0] }))
      .then((storedIpfsHash) =>
        assert.equal(storedIpfsHash, ipfsHash, "Stored IPFS hash should match")
      )
      .then(() => contractInstance.getUserData(0, { from: accounts[0] }))
      .catch((error) =>
        assert(
          error.message.includes("Not authorized to view user data"),
          "Error: User should not be able to view other user's data"
        )
      );
  });

  it("should allow users to update/replace their IPFS hashes", () => {
    const originalIpfsHash = "QmXcY1jKMG8os4wLQ4ApKeKadM4oMUpKoqmPpX9gGcMP1a";
    const updatedIpfsHash = "QmTmJYzTrTSMNXUhT1nyJRh7S1Q2xdErLJ3qdcx4pV7Y4t";
    return contractInstance
      .storeUserData(originalIpfsHash, { from: accounts[0] })
      .then(() => contractInstance.getUserDataCount({ from: accounts[0] }))
      .then((userDataCount) =>
        assert.equal(userDataCount, 1, "User data count should be 1")
      )
      .then(() =>
        contractInstance.updateUserData(originalIpfsHash, updatedIpfsHash, {
          from: accounts[0],
        })
      )
      .then(() => contractInstance.getUserDataCount({ from: accounts[0] }))
      .then((userDataCount) =>
        assert.equal(
          userDataCount,
          1,
          "User data count should still be 1 after update"
        )
      )
      .then(() => contractInstance.getUserData(0, { from: accounts[0] }))
      .then((storedIpfsHash) =>
        assert.equal(
          storedIpfsHash,
          updatedIpfsHash,
          "Stored IPFS hash should match the updated hash"
        )
      );
  });

  it("should allow users to remove their IPFS hashes", () => {
    const ipfsHash = "QmXcY1jKMG8os4wLQ4ApKeKadM4oMUpKoqmPpX9gGcMP1a";
    return contractInstance
      .storeUserData(ipfsHash, { from: accounts[0] })
      .then(() => contractInstance.getUserDataCount({ from: accounts[0] }))
      .then((userDataCount) =>
        assert.equal(userDataCount, 1, "User data count should be 1")
      )
      .then(() =>
        contractInstance.removeUserData(ipfsHash, { from: accounts[0] })
      )
      .then(() => contractInstance.getUserDataCount({ from: accounts[0] }))
      .then((userDataCount) =>
        assert.equal(
          userDataCount,
          0,
          "User data count should be 0 after removal"
        )
      )
      .catch((error) =>
        assert(
          error.message.includes("IPFS hash does not exist for this user"),
          "Error: IPFS hash should be removed"
        )
      );
  });
});
