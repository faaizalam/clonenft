import { useCallback, useContext, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

// Wallet
import * as config from "../component/confignft/config";
import * as utils from "../Utility/utils";
import * as walletConnect from "../Utility/wallet-connect";
import * as walletMetamask from "../Utility/wallet-metamask";
import * as walletDefiwallet from "../Utility/wallet-defiwallet";
import {
  updateChainDataAction,
  updateRefreshingAction,
  updateWalletAction,
} from "../contexts/wallet-actions";
import { defaultChainData, defaultWallet } from "../contexts/wallets-context";
import { ethers } from "ethers";
import { Wallet } from "../contexts/wallets-context";
import Axios from "axios";
import { BASEURL } from "../config/config";

export default function useWallet() {
  // States
  const { state, dispatch } = useContext(Wallet);
  // const [cookies, setCookie, removeCookie] = useCookies(["crosader"]);

  // Functions
  const login = (oxaddress) => {
    return Axios.post(`${BASEURL}/users/wallet-login`, { oxaddress })
      .then((res) => {
        return { success: true, ...res.data };
      })
      .catch((err) => {
        console.log("Unable to login");
        return {};
      });
  };

  const disconnectWallet = useCallback(() => {
    updateWalletAction(dispatch, { ...defaultWallet });
    deleteCookie("selectedWallet", {
      domain: "localhost",
    });
  }, [dispatch, deleteCookie]);

  const connectWallet = useCallback(
    async (option) => {
      /* Set loadingg to true here */
      updateRefreshingAction(dispatch, {
        status: true,
        message: "Connecting wallet...",
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      updateWalletAction(dispatch, { ...defaultWallet });
      let newWallet;
      switch (option) {
        // Wallet injected within browser (MetaMask)
        case "injected":
          newWallet = await walletMetamask.connect();
          break;
        // Crypto.com DeFi Wallet Extension (browser)
        case "defi-wallet":
          newWallet = await walletDefiwallet.connect();
          break;
        // Crypto.com DeFi Wallet mobile app (via Wallet Connect)
        case "wallet-connect":
          newWallet = await walletConnect.connect();
          break;
        default:
      }

      // If wallet is connected, query the wallet and update stored values
      if (newWallet.connected) {
        //Save selected wallet in cookies for auto-login
        setCookie("selectedWallet", option, {
          domain:"localhost",
        
        });
        const totalTransactions =
          await newWallet.serverWeb3Provider.getTransactionCount(
            newWallet.address
          );
        const croBalance = await utils.getCroBalance(
          newWallet.serverWeb3Provider,
          newWallet.address
        );
        const user = await login(newWallet.address);
        updateWalletAction(dispatch, newWallet);
        updateChainDataAction(dispatch, {
          ...defaultChainData,
          ...user,
          croBalance: croBalance,
          transactions: totalTransactions,
        });
        updateRefreshingAction(dispatch, {
          status: false,
          message: "Complete",
        });
        // console.log("Connection Successfull!");
      } else {
        // console.log("Connection failed!");
        updateRefreshingAction(dispatch, {
          status: false,
          message: "Complete",
        });
      }
      /* Set loadingg to 'false' here */
    },
    [dispatch, setCookie]
  );

  /* Transfer CRO */
  const transferCRO = async (recipientAddress, valueCro) => {
    if (!state.wallet.connected) {
      window.alert("Wallet not yet connected.");
      return null;
    }
    updateRefreshingAction(dispatch, {
      status: true,
      message: "Creating transaction...",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fromSigner = state.wallet.browserWeb3Provider.getSigner();
    window.alert(JSON.stringify(fromSigner));
    const tx = await fromSigner.sendTransaction({
      to: recipientAddress,
      value: ethers.utils.parseEther(valueCro.toString()),
      data: "0x",
    });
    window.alert("Transaction hash: " + tx.hash);
    updateRefreshingAction(dispatch, {
      status: false,
      message: "Complete",
    });
  };

  useEffect(() => {
    async function initialLoad() {
      // const { selectedWallet } = getCookie;
      const cookiesOptions = {
        path: "/",
        domain: "localhost",
        
      };
      const selectedWallet = getCookie("selectedWallet", cookiesOptions);
      if (config.configVars.activateAutoLogin && selectedWallet) {
        await connectWallet(selectedWallet);
      }
      // if (config.configVars.activateAutoLoginDefiWallet) {
      //   await connectWallet("defi-wallet");
      //   console.log("Initial load");
      // }
    }

    initialLoad();
  }, [connectWallet]);

  return { state, connectWallet, disconnectWallet, transferCRO };
}
