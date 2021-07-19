function reducer(state = {}, action) {
  switch (action.type) {
    case "AUTH_GRANTED": {
      const { access } = action.payload;
      const authState = {
        tokenId: access,
      };
      localStorage.setItem("tokenId", authState.tokenId);
      return { ...state, authentication: authState };
    }

    case "AUTH_RUN": {
      const authState = { tokenId: localStorage.getItem("tokenId") };
      return { ...state, authentication: authState };
    }

    case "NEW_USER": {  
      const regAcc = action.payload[0];
      const regUser = action.payload[1];
      return { ...state, userData: {regAcc:regAcc, regUser:regUser }};
    }

    case "LOG_OUT": {
      localStorage.clear();
      return { ...state, authentication: { tokenId: null } };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
