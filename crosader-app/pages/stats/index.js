import React, { useContext, useEffect, useState } from "react";
import Icons from "../icons/icon";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../component/Nft/InputField";
import ThemeSwitcher from "../../component/ThemeSwitcher/ThemeSwitcher";
// import ListProjectBox from "../../../UI/ListProjectBox/ListProjectBox";
import {
  updateCurrentMintState,
  updateCurrentSortState,
} from "../../redux/log";
import classes from "./Index.module.scss";
import TabMenu from "../../component/TabMenu/TabMenu";
import { orderBy } from "lodash";
import { fetchProjects } from "../../redux/projects";
import WalletConnector from "../../component/WalletConnector/WalletConnector";
import { Wallet } from "../../contexts/wallets-context";
import LoadingScreen from "../../component/LoadingScreen/LoadingScreen";
const SalesIndex = () => {
  const { state: walletState } = useContext(Wallet);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchProjects()).finally(() => setLoading(false));
  }, [dispatch]);

  const { push } = useRouter();
  // const navigate=push
  // const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentMintState, currentSortStatus } = useSelector(
    (state) => state.log
  );
  const { projects, mintStatus } = useSelector((state) => state.Projects);
  const [filterText, setFilterText] = useState("");
  const [type, setType] = useState("Sales");
  const [randomSortedProjects, setRandomSortedProjects] = useState([]);
  const [selectedMintingStatus, setSelectedMintingStatus] = useState("All");

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
    // dispatch(updateCurrentMintState(newValue));
    setType(newValue);
  };

  const goToDetailPage = (name) => {
    const url = name.replace(/ /g, "-").toLowerCase();
    push(`/stats/${url}`);
  };

  const handleCardSort = () => {
    let sortedProjects;
    if (!projects) return;
    sortedProjects = projects.filter(
      ({ nftContractDetails }) => nftContractDetails
    );
    sortedProjects = sortedProjects.map(({ name, nftContractDetails }) => {
      return {
        name,
        sales1d: nftContractDetails.sales1d,
        sales7d: nftContractDetails.sales7d,
        sales30d: nftContractDetails.sales30d,
        numberOfSales: nftContractDetails.numberOfSales,
        volume1d: nftContractDetails.volume1d,
        volume7d: nftContractDetails.volume7d,
        volume30d: nftContractDetails.volume30d,
        totalVolume: nftContractDetails.totalVolume,
      };
    });
    setRandomSortedProjects(sortedProjects);
  };

  useEffect(() => {
    projects && handleCardSort();

    // eslint-disable-next-line
  }, [projects, currentSortStatus]);

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key, directionKey) => {
      let direction = "descending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "descending"
      ) {
        direction = "ascending";
      }
      setSortConfig({ key, direction: directionKey || direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } =
    useSortableData(randomSortedProjects);

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
            hideAll
            header={currentMintState || "Sales"}
            options={["Sales", "Volume"]}
            onChanged={filterProjects}
          />
        </div>
      </div>
    );
  }

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    const direction =
      sortConfig.key === name ? sortConfig.direction : undefined;
    if (!direction) return;
    if (direction === "descending")
      return <span style={{ marginLeft: "3px" }}>⬆️</span>;
    return <span style={{ marginLeft: "3px" }}>⬇️</span>;
  };

  if (projects && (!filterText || filterText === "")) {
    projectElements = items.map((project) => {
      if (type === "Sales")
        return (
          <tr className={classes.ProjectsWrapper}>
            <td onClick={() => goToDetailPage(project.name)}>{project.name}</td>
            <td>{Math.round(project.sales1d || 0)}</td>
            <td>{Math.round(project.sales7d || 0)}</td>
            <td>{Math.round(project.sales30d || 0)}</td>
            <td>{Math.round(project.numberOfSales || 0)}</td>
          </tr>
        );

      return (
        <>
          <tr className={classes.ProjectsWrapper}>
            <td onClick={() => goToDetailPage(project.name)}>{project.name}</td>
            <td>{Math.round(project.volume1d || 0)}</td>
            <td>{Math.round(project.volume7d || 0)}</td>
            <td>{Math.round(project.volume30d || 0)}</td>
            <td>{Math.round(project.totalVolume || 0)}</td>
          </tr>
        </>
      );
    });
  }

  if (filterText && filterText !== "") {
    const projectsFilteredByName = items.filter((project) => {
      return project.name
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase());
    });
    if (projectsFilteredByName.length > 0) {
      projectsFilteredByNameElements = projectsFilteredByName.map((project) => {
        if (type === "Sales")
          return (
            <tr className={classes.ProjectsWrapper}>
              <td onClick={() => goToDetailPage(project.name)}>
                {project.name}
              </td>
              <td>{Math.round(project.sales1d || 0)}</td>
              <td>{Math.round(project.sales7d || 0)}</td>
              <td>{Math.round(project.sales30d || 0)}</td>
              <td>{Math.round(project.numberOfSales || 0)}</td>
            </tr>
          );

        return (
          <>
            <tr className={classes.ProjectsWrapper}>
              <td onClick={() => goToDetailPage(project.name)}>
                {project.name}
              </td>
              <td>{Math.round(project.volume1d || 0)}</td>
              <td>{Math.round(project.volume7d || 0)}</td>
              <td>{Math.round(project.volume30d || 0)}</td>
              <td>{Math.round(project.totalVolume || 0)}</td>
            </tr>
          </>
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

  useEffect(() => {
    type === "Sales"
      ? requestSort("sales1d", "descending")
      : requestSort("volume1d", "descending");
  }, [type]);
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
          placeholder="Search"
          onChanged={filterChangeHandler}
        />
      </div>
      {mintingStatusDropDown}
      <h4 className={classes.Heading}>
        {type === "Sales" ? type : "Volume (in CRO)"}
      </h4>
      <div className={classes.ProjectsContainer}>
        <table className="w3-table-all">
          <thead>
            {type === "Sales" ? (
              <>
                <th onClick={() => requestSort("name")}>
                  Project
                  {getClassNamesFor("name")}
                </th>
                <th onClick={() => requestSort("sales1d")}>
                  1d
                  {getClassNamesFor("sales1d")}
                </th>
                <th onClick={() => requestSort("sales7d")}>
                  7d
                  {getClassNamesFor("sales7d")}
                </th>
                <th onClick={() => requestSort("sales30d")}>
                  30d
                  {getClassNamesFor("sales30d")}
                </th>
                <th onClick={() => requestSort("totalRoyalties")}>
                  Total
                  {getClassNamesFor("totalRoyalties")}
                </th>
              </>
            ) : (
              <>
                <th onClick={() => requestSort("name")}>
                  Project
                  {getClassNamesFor("name")}
                </th>
                <th onClick={() => requestSort("volume1d")}>
                  1d
                  {getClassNamesFor("volume1d")}
                </th>
                <th onClick={() => requestSort("volume7d")}>
                  7d
                  {getClassNamesFor("volume7d")}
                </th>
                <th onClick={() => requestSort("volume30d")}>
                  30d
                  {getClassNamesFor("volume30d")}
                </th>
                <th onClick={() => requestSort("totalVolume")}>
                  Total
                  {getClassNamesFor("totalVolume")}
                </th>
              </>
            )}
          </thead>
          {projectElements}
          {projectsFilteredByNameElements}
        </table>
      </div>
      {noProjectFoundText}
    </div>
  );
};

export default SalesIndex;
