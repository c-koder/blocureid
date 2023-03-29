export const setCurrentUser = (payload) => {
  return {
    type: "SET_CURRENT_USER",
    payload: payload,
  };
};

export const setWalletAccount = (payload) => {
  return {
    type: "SET_WALLET_ACCOUNT",
    payload: payload,
  };
};
