const initialState = {
  currentUser: undefined,
  walletAddress: undefined,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: payload };
    case "SET_WALLET_ADDRESS":
      return { ...state, walletAddress: payload };
    default:
      return state;
  }
};

export default reducer;
