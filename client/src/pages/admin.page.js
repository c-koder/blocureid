import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import DigitalIdentityAbi from "../config/abi.json";
import { setWalletAddress } from "../redux/actions";

const web3 = new Web3(window.ethereum);
const contractAddress = "0x29C0331243580231bd058733A3EcBCc8B28EeB32";
const digitalIdentityContract = new web3.eth.Contract(
  DigitalIdentityAbi.abi,
  contractAddress
);
const Admin = () => {
  const dispatch = useDispatch();

  const walletAddress = useSelector((state) => state.walletAddress);

  const hash = "QmXcY1jKMG8os4wLQ4ApKeKadM4oMUpKoqmPpX9gGcMP1b";
  const [returnedHash, setReturnedHash] = useState([]);

  useEffect(() => {
    !walletAddress &&
      (async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        dispatch(setWalletAddress(accounts[0]));
      })();
    // eslint-disable-next-line
  }, []);

  const storeUserData = async (ipfsHash) => {
    const gas = await digitalIdentityContract.methods
      .storeUserData(ipfsHash)
      .estimateGas();
    await digitalIdentityContract.methods.storeUserData(ipfsHash).send({
      from: walletAddress,
      gas,
    });
  };

  const getUserData = async () => {
    return await digitalIdentityContract.methods
      .getUserData()
      .call({ from: walletAddress });
  };

  return (
    <div>
      <button onClick={() => storeUserData(hash)}>Store</button>
      <button onClick={async () => setReturnedHash(await getUserData())}>
        Get
      </button>
      <ul>
        {returnedHash.length > 0 &&
          returnedHash.map((h, _id) => <li key={_id}>{h}</li>)}
      </ul>
    </div>
  );
};

export default Admin;
