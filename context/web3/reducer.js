export const Web3Reducer = (state, action) => {
    switch (action.type) {
      case 'SET_ACCOUNT':
        return {
          ...state,
          account: action.payload,
        };
  
      case 'SET_PROVIDER':
        return {
          ...state,
          provider: action.payload,
        };
  
      case 'SET_SIGNER':
        return {
          ...state,
          signer: action.payload,
        };
  
      case 'SET_CONTRACT':
        return {
          ...state,
          contract: action.payload,
        };

  
      case 'SET_WEB3_MODAL':
        return {
          ...state,
          web3Modal: action.payload
        };
  
      case 'SET_WEB3_INSTANCE':
        return {
          ...state,
          web3Instance: action.payload
        }
  
      default:
        return state;
    }
};  
