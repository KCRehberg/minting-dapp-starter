import { createContext, useReducer } from 'react';
import { Web3Reducer } from './reducer';
import { web3Config } from './web3config';
import { ethers } from 'ethers';

const contractAddress = web3Config.contract;

const initialState = {
  account             : null,
  provider            : null,
  signer              : null,
  contract            : null,
  web3Modal           : null,
  web3Instance        : null,
};

export const Web3Context = createContext(initialState);

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const setAccount           = (account) => dispatch({ type: 'SET_ACCOUNT', payload: account });
  const setProvider          = (provider) => dispatch({ type: 'SET_PROVIDER', payload: provider });
  const setSigner            = (signer) => dispatch({ type: 'SET_SIGNER', payload: signer });
  const setContract          = (contract) => dispatch({ type: 'SET_CONTRACT', payload: contract });
  const setWeb3Modal         = (web3modal) => dispatch({ type: 'SET_WEB3_MODAL', payload: web3modal });
  const setWeb3Instance      = (instance) => dispatch({ type: 'SET_WEB3_INSTANCE', payload: instance });

  const logout = async () => {
    setSigner(null);
    setAccount(null);
    setProvider(null);
    setContract(null);
    setWeb3Modal(null);
    setWeb3Instance(null);

    if(state.web3Modal) {
      state.web3Modal.clearCachedProvider();
    }
  };

  const initiateWeb3Values = async (provider, instance) => {
    // Check for the correct chain
    const { chainId } = await provider.getNetwork();
    if (!(chainId === web3Config.chainId)) {
      try {
        const chainHex = `${web3Config.chainId}`.toString("hex");
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainHex}` }]
        });
      } catch(err) {
        console.log(err);
      }

      throw new Error('Please try an connect again, on the right network.');
    }

    setWeb3Instance(instance);

    // Load wallet info
    setProvider(provider);
    const signer = await provider.getSigner();
    setSigner(signer);
    const account = await signer.getAddress();
    setAccount(account);

    // Load contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
    setContract(contract);
  }

  return (
    <Web3Context.Provider
      value={{
        ...state,
        logout,
        setWeb3Modal,
        setWeb3Instance,
        initiateWeb3Values,
        setSigner,
        setAccount,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};