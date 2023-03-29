// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract DigitalIdentity {
    struct UserData {
        string[] ipfsHashes;
        mapping(string => bool) ipfsHashExists;
    }

    mapping(address => UserData) private userData;

    function storeUserData(string memory _ipfsHash) public {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(validateIPFSHash(_ipfsHash), "Invalid IPFS hash format");
        require(
            !userData[msg.sender].ipfsHashExists[_ipfsHash],
            "IPFS already found for this user"
        );
        userData[msg.sender].ipfsHashes.push(_ipfsHash);
        userData[msg.sender].ipfsHashExists[_ipfsHash] = true;
    }

    function getUserData() public view returns (string[] memory) {
        require(
            msg.sender == tx.origin || msg.sender == address(this),
            "Not authorized to view user data"
        );
        return userData[msg.sender].ipfsHashes;
    }

    function validateIPFSHash(
        string memory _ipfsHash
    ) private pure returns (bool) {
        bytes memory ipfsBytes = bytes(_ipfsHash);
        if (ipfsBytes.length != 46) return false;
        if (ipfsBytes[0] != bytes1("Q") || ipfsBytes[1] != bytes1("m"))
            return false;
        return true;
    }

    function removeUserData(string memory _ipfsHash) public {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(
            userData[msg.sender].ipfsHashExists[_ipfsHash],
            "IPFS hash not found for this user"
        );
        uint256 index = getIndexOfUserData(_ipfsHash);
        for (
            uint256 i = index;
            i < userData[msg.sender].ipfsHashes.length - 1;
            i++
        ) {
            userData[msg.sender].ipfsHashes[i] = userData[msg.sender]
                .ipfsHashes[i + 1];
        }
        userData[msg.sender].ipfsHashes.pop();
        delete userData[msg.sender].ipfsHashExists[_ipfsHash];
    }

    function getIndexOfUserData(
        string memory _ipfsHash
    ) private view returns (uint256) {
        uint256 index;
        for (uint256 i = 0; i < userData[msg.sender].ipfsHashes.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(userData[msg.sender].ipfsHashes[i])
                ) == keccak256(abi.encodePacked(_ipfsHash))
            ) {
                index = i;
                break;
            }
        }
        return index;
    }

    function updateUserData(
        string memory _oldIpfsHash,
        string memory _newIpfsHash
    ) public {
        require(
            bytes(_oldIpfsHash).length > 0 && bytes(_newIpfsHash).length > 0,
            "IPFS hash cannot be empty"
        );
        require(validateIPFSHash(_newIpfsHash), "Invalid IPFS hash format");
        require(
            userData[msg.sender].ipfsHashExists[_oldIpfsHash],
            "IPFS hash not found for this user"
        );
        uint256 index = getIndexOfUserData(_oldIpfsHash);
        userData[msg.sender].ipfsHashes[index] = _newIpfsHash;
        userData[msg.sender].ipfsHashExists[_newIpfsHash] = true;
        delete userData[msg.sender].ipfsHashExists[_oldIpfsHash];
    }
}
