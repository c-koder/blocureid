const initialState = {
  currentUser: undefined,
  walletAccount: undefined,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: payload };
    case "SET_WALLET_ACCOUNT":
      return { ...state, walletAccount: payload };
    default:
      return state;
  }
};

export default reducer;
