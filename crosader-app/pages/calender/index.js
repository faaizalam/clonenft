import React, { useContext, useEffect, useState } from "react";
import InputField from "../../component/Nft/InputField";

import Icons from "../icons/icon";
import ProjectInCalendar from "./ProjectInCalendar/ProjectInCalendar";
import classes from "./Index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { groupBy as group } from "lodash";
import {
  updateCurrentMintState,
  updateCurrentSortState,
} from "../../redux/log";
import TabMenu from "../../component/TabMenu/TabMenu";
import { fetchProjects } from "../../redux/projects";
import WalletConnector from "../../component/WalletConnector/WalletConnector";
// import WalletConnector from "../../component/WalletConnector/WalletConnector";
import { Wallet } from "../../contexts/wallets-context";
import LoadingScreen from "../../component/LoadingScreen/LoadingScreen";

const Index = () => {
  const { state: walletState } = useContext(Wallet);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchProjects()).finally(() => setLoading(false));
  }, [dispatch]);
  const { theme } = useSelector((state) => state.theme);
  const { currentMintState } = useSelector((state) => state.log);
  const { projects, mintStatus } = useSelector((state) => state.Projects);
  const [selectedMintingStatus, setSelectedMintingStatus] =
    useState(currentMintState);
  const [filterText, setFilterText] = useState("");
  // const dispatch = useDispatch();

  let styleClasses = classes.Calendar;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const filterChangeHandler = (event) => {
    setFilterText(event.target.value);
  };

  const groupBy = (arr, criteria) =>
    arr.reduce((obj, item) => {
      let key =
        typeof criteria === "function" ? criteria(item) : item[criteria];
      key = item["publicMintAnnouncement"]
        ? "TBA"
        : moment.unix(key).format("MM/DD/YYYY");
      if (!obj.hasOwnProperty(key)) obj[key] = [];
      obj[key].push(item);
      return obj;
    }, {});

  const groupByMonth = (arr, criteria) => {
    let filteredContent;
    const groupData = group(arr, ({ [criteria]: groupDate }) =>
      moment.unix(groupDate).format("MMMM y")
    );

    Object.keys(groupData).forEach((keys) => {
      const data = groupBy(groupData[keys], criteria);
      filteredContent = { ...filteredContent, [keys]: data };
    });
    return filteredContent;
  };

  const getProjects = () => {
    // 30 days entries allowed to render logic
    // const pastDate = new Date(new Date().setDate(new Date().getDate() - 14));
    // const futureDate = new Date(new Date().setDate(new Date().getDate() + 30));

    if (projects) {
      let projectsFilteredByDate = projects.filter((project) => {
        if (!project.publicMintDate) {
          return false;
        }
        if (!selectedMintingStatus || selectedMintingStatus === "All") {
          return (
            project.projectType?.some(({ name }) =>
              name.toLowerCase().includes("nfts")
            ) && project.mintStatus
          );
        }

        return (
          project.projectType?.some(({ name }) =>
            name.toLowerCase().includes("nfts")
          ) &&
          project.mintStatus &&
          project.mintStatus.name === selectedMintingStatus
        );
      });

      if (filterText) {
        projectsFilteredByDate = projectsFilteredByDate?.filter((project) => {
          return project.name.toLowerCase().includes(filterText.toLowerCase());
        });
      }

      projectsFilteredByDate.sort(function (a, b) {
        if (b.publicMintAnnouncement) return -1;
        var c = new Date(a.publicMintDate);
        var d = new Date(b.publicMintDate);
        return c - d;
      });
      const groupedByMonthAndDay = groupByMonth(
        projectsFilteredByDate,
        "publicMintDate"
      );

      return groupedByMonthAndDay;
    }
    return [];
  };

  getProjects();

  let projectElements = null;
  let mintingStatusDropDown = null;

  const filterProjects = (newValue) => {
    dispatch(updateCurrentMintState(newValue));
    setSelectedMintingStatus(newValue);
  };

  if (mintStatus) {
    mintingStatusDropDown = (
      <div className={classes.TabMenuRow}>
        <TabMenu
          customClasses="mt-1-6"
          header={currentMintState || "Mint Status"}
          options={mintStatus.map((status) => status.name)}
          onChanged={filterProjects}
        />
      </div>
    );
  }

  if (projects) {
    const projectsFilteredByDate = getProjects();
    if (
      projectsFilteredByDate &&
      Object.keys(projectsFilteredByDate)?.length > 0
    ) {
      projectElements = Object.keys(projectsFilteredByDate).map(
        (parentKey, i) => {
          return (
            <div key={i}>
              <div className={classes.MonthContainer}>{parentKey}</div>
              <div>
                {Object.keys(projectsFilteredByDate[parentKey]).map(
                  (key, i) => {
                    return (
                      <div key={i} className={classes.CalendarOptionContainer}>
                        <span className={classes.DateAsider}>
                          {key === "TBA" ? (
                            <span>TBA</span>
                          ) : (
                            <>
                              <span>{moment(key).format("Do")}</span>
                              <span>{moment(key).format("MMM")}</span>
                            </>
                          )}
                        </span>
                        <div>
                          {projectsFilteredByDate[parentKey][key].map(
                            (project) => {
                              return (
                                <ProjectInCalendar
                                  key={project.name}
                                  name={project.name}
                                  date={project.publicMintDate}
                                  isTBA={key === "TBA"}
                                  status={
                                    project.mintStatus
                                      ? project.mintStatus.name
                                      : "N/A"
                                  }
                                />
                              );
                            }
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        }
      );
    } else {
      projectElements = null;
    }
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
      {isLoading && <div className="circle-loader"></div>}
      <div className={classes.SearchAndTheme}>
        <InputField
          icon="magnifier"
          value={filterText}
          placeholder="Search Project"
          onChanged={filterChangeHandler}
        />
      </div>
      <h4 className={classes.Heading}>
        Calendar <span>(Based on Public Mint Date)</span>
      </h4>
      {mintingStatusDropDown}
      {projectElements}
    </div>
  );
};

export default Index;
