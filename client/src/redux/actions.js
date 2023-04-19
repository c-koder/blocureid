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
export const setCurrentNav = (payload) => {
  return {
    type: "SET_CURRENT_NAV",
    payload: payload,
  };
};

export const setSidebarIndex = (payload) => {
  return {
    type: "SET_SIDEBAR_INDEX",
    payload: payload,
  };
};
