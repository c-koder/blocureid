export const setCurrentUser = (payload) => {
  return {
    type: "SET_CURRENT_USER",
    payload: payload,
  };
};

export const setWalletAddress = (payload) => {
  return {
    type: "SET_WALLET_ADDRESS",
    payload: payload,
  };
};
