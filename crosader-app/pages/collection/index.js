import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import InputField from "../../component/Nft/InputField";
import Icons from "../icons/icon";
import { useRouter } from "next/router";
import ThemeSwitcher from "../../component/ThemeSwitcher/ThemeSwitcher";
import ListProjectBox from "../../component/ListProjectBox/ListProjectBox";
import {
  updateCurrentMintState,
  updateCurrentSortState,
} from "../../redux/log";
import classes from "./Index.module.scss";
import TabMenu from "../../component/TabMenu/TabMenu";
import { orderBy } from "lodash";
import Axios from "axios";
import { fetchProjects } from "../../redux/projects";
import { BASEURL, serverAxios } from "../../config/config";
import WalletConnector from "../../component/WalletConnector/WalletConnector";
import { Wallet } from "../../contexts/wallets-context";
import LoadingScreen from "../../component/LoadingScreen/LoadingScreen";
const Index = () => {

  
  const { state: walletState } = useContext(Wallet);
  console.log(walletState)

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchProjects()).finally(() => setLoading(false));
  }, [dispatch]);

  // const navig = useNavigate();
  const router = useRouter();


  const { theme } = useSelector((state) => state.theme);
  const { currentMintState, currentSortStatus } = useSelector(
    (state) => state.log
  );
  const { projects, mintStatus } = useSelector((state) => state.Projects);
  const [filterText, setFilterText] = useState("");
  const [randomSortedProjects, setRandomSortedProjects] = useState([]);
  const [selectedMintingStatus, setSelectedMintingStatus] =
    useState(currentMintState);

  const randomizeSorting = (a, b) => {
    return 0.5 - Math.random();
  };

  let styleClasses = classes.NFTs;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const filterChangeHandler = (event) => {
    setFilterText(event.target.value);
  };

  const handleSortState = () => {
    switch (currentSortStatus) {
      case "newest":
        dispatch(updateCurrentSortState("oldest"));
        break;
      case "oldest":
        dispatch(updateCurrentSortState("newest"));
        break;

      default:
        dispatch(updateCurrentSortState("oldest"));
        break;
    }
  };

  const filterProjects = (newValue) => {
    dispatch(updateCurrentMintState(newValue));
    setSelectedMintingStatus(newValue);
  };

  const goToDetailPage = (name) => {
    const url = name.replace(/ /g, "-").toLowerCase();
    router.push(`/collection/${url}`);
  };

  const handleCardSort = () => {
    let sortedProjects;
    if (!projects) return;
    const sortingArray = projects.filter(
      ({ publicMintDate }) => publicMintDate
    );
    const notMintedProjects = projects.filter(
      ({ publicMintDate }) => !publicMintDate
    );
    switch (currentSortStatus) {
      case "newest":
        sortedProjects = orderBy(sortingArray, ["publicMintDate"], ["desc"]);
        sortedProjects = [...sortedProjects, ...notMintedProjects];
        break;
      case "oldest":
        sortedProjects = orderBy(sortingArray, ["publicMintDate"], ["asc"]);
        sortedProjects = [...sortedProjects, ...notMintedProjects];
        break;

      default:
        sortedProjects = [...projects]?.sort(randomizeSorting);
        break;
    }
    setRandomSortedProjects(sortedProjects);
  };

  const handleRandomize = () => {
    if (currentSortStatus === "random") return handleCardSort();
    dispatch(updateCurrentSortState("random"));
  };

  useEffect(() => {
    projects && handleCardSort();
    // eslint-disable-next-line
  }, [projects, currentSortStatus]);

  let mintingStatusDropDown = null;
  let projectElements = null;
  let projectsFilteredByNameElements = null;
  let noProjectFoundText = null;

  if (mintStatus) {
    mintingStatusDropDown = (
      <div className={classes.DropdownContainer}>
        <div className={classes.TabMenuRow}>
          <TabMenu
            customClasses="mt-1-6"
            header={currentMintState || "Mint Status"}
            options={mintStatus.map((status) => status.name)}
            onChanged={filterProjects}
            n={mintStatus}
          />
        </div>
        <div className={classes.SortContainer}>
          <span onClick={handleSortState}>
            <Icons
              name={currentSortStatus === "oldest" ? "sortUp" : "sortDown"}
            />
          </span>
          <span onClick={handleRandomize}>
            <Icons name={"shuffle"} />
          </span>
        </div>
        {/* <span onClick={handleSortState}>Sort</span>
        <span onClick={handleRandomize}>Random</span> */}
      </div>
    );
  }

  if (projects && (!filterText || filterText === "")) {
    projectElements = randomSortedProjects
      .filter((project) => {
        if (!selectedMintingStatus || selectedMintingStatus === "All") {
          return project.projectType?.some(
            ({ name }) => name?.toLowerCase() === "nfts"
          );
        }

        return (
          project.projectType?.some(({ name }) =>
            name.toLowerCase().includes("nfts")
          ) &&
          project.mintStatus &&
          project.mintStatus.name === selectedMintingStatus
        );
      })
      .map((project) => {
        return (
          <ListProjectBox
            key={project._id}
            name={project.name}
            image={`${BASEURL}/projects/${project._id}/image`}
            status={project.mintStatus && project.mintStatus.name}
            type={project.projectType.name}
            mintDate={project.publicMintDate}
            onClicked={goToDetailPage}
          />
        );
      });
  }

  if (filterText && filterText !== "") {
    const projectsFilteredByName = projects.filter((project) => {
      return (
        project.projectType?.some(({ name }) =>
          name.toLowerCase().includes("nfts")
        ) && project.name.toLowerCase().includes(filterText.toLocaleLowerCase())
      );
    });
    if (projectsFilteredByName.length > 0) {
      projectsFilteredByNameElements = projectsFilteredByName.map((project) => {
        return (
          <ListProjectBox
            key={project._id}
            name={project.name}
            image={`${BASEURL}/projects/${project._id}/image`}
            status={project.mintStatus && project.mintStatus.name}
            type={project.projectType.name}
            mintDate={project.publicMintDate}
            onClicked={goToDetailPage}
          />
        );
      });
    } else {
      projectsFilteredByNameElements = null;
    }
  }

  if (filterText && filterText !== "" && !projectsFilteredByNameElements) {
    noProjectFoundText = (
      <p className={classes.NoProjectFound}>
        No project found for <strong>{filterText}</strong>.
      </p>
    );
  }

  const isReady = () => {
    const updatingWallet = walletState.refreshing.status;
    return isLoading || updatingWallet;
  };

  const loadingText = () => {
    // if (isLoading) return "Loading data...";
    if (isLoading) return "";
    if (walletState.refreshing.status) return "Updating wallet...";
  };

  return (
    <div className={styleClasses}>
    {isReady() && <LoadingScreen showText text={loadingText()} />}
    {/* {<LoadingScreen/>} */}
      {isLoading && (
        <div>
          <div className="loader relative top-56 z-50"></div>
        </div>
      )}

      <div className={classes.SearchAndTheme}>
        <InputField
          icon="magnifier"
          value={filterText}
          placeholder="Search NFTs"
          onChanged={filterChangeHandler}
        />
      </div>
      {mintingStatusDropDown}
      <h4>NFTs</h4>
      {isLoading && <div className="circle-loader"></div>}
      <div className={classes.Projects}>
        {projectElements}
        {projectsFilteredByNameElements}
      </div>

      {noProjectFoundText}
    </div>
  );
};

export default Index;
