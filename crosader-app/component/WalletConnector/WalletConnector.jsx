import { useSelector } from "react-redux";
import useToggle from "../../hook/useToggle";

import classes from "./WalletConnector.module.scss";
// import classes from "../../pages/collection/Index.module.scss";

//TODOS
// Add the "connect to wallet" button
// Add the profile page

// Wallet
// import * as utils from "../../../helpers/utils";
import useWallet from "../../hook/useWallet";
// import { useNavigate } from "react-router-dom";
import Router, { useRouter } from "next/router";
import Image from "../Image";

const WalletConnector = () => {
  const router = useRouter;
  const { theme } = useSelector((state) => state.theme);
  const [showList, toggleList] = useToggle(false);
  const { state, connectWallet, disconnectWallet } = useWallet();

  let styleClasses = classes.WalletBox;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  } else {
    styleClasses = [styleClasses, classes.Dark].join(" ");
  }

  function connectWalletHandler(wallet) {
    connectWallet(wallet);
    toggleList();
  }

  return (
    <div className={styleClasses}>
      {state.wallet.connected && (
        <button onClick={disconnectWallet} className={classes.ConnectBtn}>
          Disconnect Wallet
        </button>
      )}
      {state.wallet.connected && (
        <button
          onClick={() => Router.push("/profile")}
          className={classes.ConnectBtn}
        >
          Profile
        </button>
      )}
      {!state.wallet.connected && (
        <button onClick={toggleList} className={classes.ConnectBtn}>
          Connect Wallet
        </button>
      )}
      {showList && (
        <ul className={classes.WalletList}>
          <li>
            <button
              className={classes.buttons}
              onClick={() => connectWalletHandler("defi-wallet")}
            >
              <Image src="/Images/crypto-wallet.png" alt="Defi Wallet" />
              crypto.com defi wallet
            </button>
          </li>
          <li>
            <button onClick={() => connectWalletHandler("injected")}>
              <Image src="/Images/metamask.png" alt="Metamask" />
              metamask
            </button>
          </li>
          <li>
            <button onClick={() => connectWalletHandler("wallet-connect")}>
              <Image src="/Images/walletconnecct.png" alt="WalletConnect" />
              walletconnect
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default WalletConnector;
