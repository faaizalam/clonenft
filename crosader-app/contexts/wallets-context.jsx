import React, { createContext, useReducer } from "react";

export const defaultRefreshing = {
  status: false,
  message: "Please wait a few seconds...",
};

export const defaultWallet = {
  walletProviderName: "",
  address: "",
  browserWeb3Provider: null,
  serverWeb3Provider: null,
  connected: false,
  chainId: 0,
};

export const defaultChainData = {
  croBalance: 0,
  transactions: 0,
};

export const initialState = {
  context: "welcome",
  refreshing: defaultRefreshing,
  wallet: defaultWallet,
  chainData: defaultChainData,
};

export const Wallet = createContext({ ...initialState });

function reducer(state, action) {
  switch (action.type) {
    case "CONTEXT_UPDATED":
      return { ...state, context: action.payload };
    case "REFRESHING_UPDATED":
      return { ...state, refreshing: action.payload };
    case "WALLET_UPDATED":
      return { ...state, wallet: action.payload };
    case "CHAINDATA_UPDATED":
      return { ...state, chainData: action.payload };
    default:
      return state;
  }
}

// This is used to inject the Store at the top level in the index.tsx file
export function WalletProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <Wallet.Provider value={{ state, dispatch }}>
     
      {props.children}
    </Wallet.Provider>
  );
}
