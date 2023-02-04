import axios from "axios";
import { useRef, useState } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";

import { Wallet } from "../../contexts/wallets-context";
import {
  updateChainDataAction,
  updateRefreshingAction,
} from "../../contexts/wallet-actions";
import useToggle from "../../hook/useToggle";
import Icon from "../icons/icon";
import classes from "./Profile.module.scss";
import localAxios from "../../config/config";

const Profile = () => {
  const { state, dispatch } = useContext(Wallet);
  const { theme } = useSelector((state) => state.theme);
  const [updatingTwitter, toggleUpdatingTwitter] = useToggle(false);
  const [updatingShareSpace, toggleUpdatingShareSpace] = useToggle(false);
  const [error, setError] = useState(null);
  const twitterInputRef = useRef(null);
  const shareSpaceYesInputRef = useRef(null);

  let styleClasses = classes.Profile;
  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  function onSubmitTwitterHandler(e) {
    e.preventDefault();
    setError(null);
    const twitter = twitterInputRef.current.value.trim();
    updateRefreshingAction(dispatch, {
      status: true,
      message: "Updating Wallet",
    });
    localAxios
      .patch(
        "/users/wallet-users",
        { twitter },
        {
          headers: {
            Authorization: `Bearer ${state.chainData.token}`,
          },
        }
      )
      .then((res) => {
        updateChainDataAction(dispatch, {
          ...state.chainData,
          twitter,
        });
      })
      .catch((err) => {
        console.log(err);
        setError("Unable to update data. Please Try again later");
      })
      .finally((res) => {
        updateRefreshingAction(dispatch, {
          status: false,
          message: "Complete",
        });
        toggleUpdatingTwitter();
      });
  }

  function onSubmitShareSpaceHandler(e) {
    e.preventDefault();
    setError(null);
    const shareSpace = shareSpaceYesInputRef.current.checked;

    updateRefreshingAction(dispatch, {
      status: true,
      message: "Updating Wallet",
    });
    localAxios
      .patch(
        "/users/wallet-users",
        { shareSpace },
        {
          headers: {
            Authorization: `Bearer ${state.chainData.token}`,
          },
        }
      )
      .then((res) => {
        updateChainDataAction(dispatch, {
          ...state.chainData,
          shareSpace,
        });
      })
      .catch((err) => {
        console.log(err);
        setError("Unable to update data. Please Try again later");
      })
      .finally((res) => {
        updateRefreshingAction(dispatch, {
          status: false,
          message: "Complete",
        });
        toggleUpdatingShareSpace();
      });
  }

  return (
    <div className=" md:h-[500px]">
      <h2 className="h2">Profile</h2>
      <ul className="bg-gray-1000 border-solid border-2  border-white p-0 m-0">
        <li className={classes.ProfileInfoItem}>
          <span>OxAddress</span>
          <span>{state.wallet.address}</span>
        </li>
        <li className={classes.ProfileInfoItem}>
          <span>CRO Balance</span>
          <span>{state.chainData.croBalance} CRO</span>
        </li>
        <li className={classes.ProfileInfoItem}>
          <span>Transaction Count</span>
          <span>{state.chainData.transactions} Transactions</span>
        </li>
        <li className={classes.ProfileInfoItem}>
          <span>Twitter ID</span>
          {!updatingTwitter && (
            <span>
              {state.chainData.twitter ? state.chainData.twitter : "N/A"}
              <button
                className={classes.EditBtn}
                onClick={toggleUpdatingTwitter}
              >
                <Icon name="pencil" height="15" width="15" />
              </button>
            </span>
          )}
          {updatingTwitter && (
            <span>
              <form
                className={classes.TwitterForm}
                onSubmit={onSubmitTwitterHandler}
              >
                <input
                  ref={twitterInputRef}
                  type="text"
                  className="px-2 rounded"
                  required
                  defaultValue={
                    state.chainData.twitter ? state.chainData.twitter : ""
                  }
                />
                <button
                  onClick={toggleUpdatingTwitter}
                  className={classes.CancelBtn}
                  type="button"
                >
                  &#10005;
                </button>
                <button className={classes.SubmitBtn} type="submit">
                  &#8594;
                </button>
              </form>
            </span>
          )}
        </li>
        <li className={classes.ProfileInfoItem}>
          <span>Share Spaces</span>
          {!updatingShareSpace && (
            <span>
              {state.chainData.shareSpace ? "Yes" : "No"}

              <button
                className={classes.EditBtn}
                onClick={toggleUpdatingShareSpace}
              >
                <Icon name="pencil" height="15" width="15" />
              </button>
            </span>
          )}
          {updatingShareSpace && (
            <span>
              <form
                className={classes.ShareSpaceForm}
                onSubmit={onSubmitShareSpaceHandler}
              >
                <label className={classes.RadioLabel}>
                  <input
                    type="radio"
                    name="share-space"
                    defaultChecked={!state.chainData.shareSpace}
                  />
                  <div>No</div>
                </label>
                <label className={classes.RadioLabel}>
                  <input
                    ref={shareSpaceYesInputRef}
                    type="radio"
                    name="share-space"
                    defaultChecked={state.chainData.shareSpace}
                  />
                  <div>Yes</div>
                </label>
                <button
                  onClick={toggleUpdatingShareSpace}
                  className={classes.CancelBtn}
                  type="button"
                >
                  &#10005;
                </button>
                <button className={classes.SubmitBtn} type="submit">
                  &#8594;
                </button>
              </form>
            </span>
          )}
        </li>
        <li className={classes.ProfileInfoItem}>
          <span>Link to Cronoscan</span>
          <span>
            <a
              className="text-white"
              href={`https://cronoscan.com/address/${state.wallet.address}`}
            >
              Click Here
            </a>
          </span>
        </li>
      </ul>
      {error && <p className={classes.Error}>{error}</p>}
    </div>
  );
};

export default Profile;
