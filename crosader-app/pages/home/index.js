import React, { Fragment, useContext, useEffect, useState } from "react";
import InputField from "../../component/Nft/InputField";
import ThemeSwitcher from "../../component/ThemeSwitcher/ThemeSwitcher";
import Dropdown from "../../component/Dropdown/Dropdown";
import Projects from "../../component/Projects/Projects";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { useNavigate } from "react-router-dom";
import SwipperProjectBox from "../../component/SwipperProjectBox/SwipperProjectBox";
import classes from "./Index.module.scss";
import { fetchProjects } from "../../redux/projects";
import { useDispatch } from "react-redux";
import { BASEURL } from "../../config/config";

import { Wallet } from "../../contexts/wallets-context";
import LoadingScreen from "../../component/LoadingScreen/LoadingScreen";

const Home = () => {
  const { state: walletState } = useContext(Wallet);
  // const { state: walletState } = useContext(Wallet);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchProjects()).finally(() => setLoading(false));
  }, [dispatch]);
  const router = useRouter();
  const { projects, projectTypes } = useSelector((state) => state.Projects);
  const [filterText, setFilterText] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState(null);

  const filterChangeHandler = (event) => {
    setFilterText(event.target.value);
  };

  const filterProjects = (newValue) => {
    setSelectedProjectType(newValue);
  };

  const getProjects = (projectType) => {
    return projects
      .filter((project) => {
        if (!project.projectType) {
          return false;
        }
        return project.projectType?.some(
          ({ name }) => name === projectType.name
        );
      })
      .map((project) => {
        return {
          image: `${BASEURL}/projects/${project._id}/image`,
          name: project.name,
          status: project.mintStatus ? project.mintStatus.name : "",
        };
      });
  };

  const goToDetailPage = (projectName) => {
    const url = projectName.replace(/ /g, "-").toLowerCase();
    router.push(url);
  };

  const getLink = (name) => {
    return name.toLowerCase().includes("nfts")
      ? "/nft"
      : `/all/${name.replace(/ /g, "-").toLowerCase()}`;
  };

  let projectTypesDropdown = null;
  let projectsElement = null;
  let filteredProjects = null;
  let noProjectFoundText = null;

  if (projectTypes) {
    projectTypesDropdown = (
      <div className={classes.Row}>
        <Dropdown
          customClasses="mt-1-6 ml-auto"
          header="Project type"
          options={projectTypes.map((projectType) => projectType.name)}
          onChanged={filterProjects}
        />
      </div>
    );
  }

  if (projects && (!filterText || filterText === "")) {
    projectsElement = projectTypes
      .filter((projectType) => {
        if (!selectedProjectType || selectedProjectType === "All") {
          return true;
        }
        return projectType.name === selectedProjectType;
      })
      .map((projectType) => {
        return (
          <Projects
            key={projectType._id}
            categoryName={projectType.name}
            allLink={getLink(projectType.name)}
            projects={getProjects(projectType)}
          />
        );
      });
  }

  if (filterText && filterText !== "") {
    const filteredProjectsByName = projects.filter((project) => {
      return project.name.toLowerCase().includes(filterText.toLowerCase());
    });
    if (filteredProjectsByName.length > 0) {
      filteredProjects = (
        <div className={classes.FilteredProjects}>
          {projects
            .filter((project) => {
              return project.name
                .toLowerCase()
                .includes(filterText.toLowerCase());
            })
            .map((project) => {
              return (
                <SwipperProjectBox
                  key={project._id}
                  name={project.name}
                  image={`${BASEURL}/projects/${project._id}/image`}
                  status={project.mintStatus ? project.mintStatus.name : ""}
                  type={project.projectType.name}
                  onClicked={() =>
                    goToDetailPage(
                      `/home/${project.projectType.name
                        .replace(/ /g, "-")
                        .toLowerCase()}/${project.name}`
                    )
                  }
                />
              );
            })}
        </div>
      );
    } else {
      filteredProjects = null;
    }
  }

  if (filterText && filterText !== "" && !filteredProjects) {
    noProjectFoundText = (
      <div className={classes.FilteredProjects}>
        <p className={classes.NoProjectFound}>
          No project found for <strong>{filterText}</strong>.
        </p>
      </div>
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
    <Fragment>
   {isReady() && <LoadingScreen showText text={loadingText()} />}
   {/* <LoadingScreen showText text={loadingText()} /> */}

      {isLoading && (
        <div>
          <div className="loader relative top-56 z-50"></div>
        </div>
      )}
      <div className={classes.SearchAndTheme}>
        <InputField
          icon="magnifier"
          value={filterText}
          placeholder="Search Cronos"
          onChanged={filterChangeHandler}
        />
      </div>
      {projectTypesDropdown}
      {projectsElement}
      {filteredProjects}
      {noProjectFoundText}
    </Fragment>
  );
};

export default Home;
