import { useRouter } from "next/router";
import SwipperProjectBox from "../SwipperProjectBox/SwipperProjectBox";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import classes from "./Projects.module.scss";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const Projects = ({ categoryName, allLink, projects = [] }) => {
  const { push } = useRouter();
  const { theme } = useSelector((state) => state.theme);
  let styleClasses = classes.Projects;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const goToDetailsPage = (projectName) => {
    const project = projectName.replace(/ /g, "-").toLowerCase();
    const category = categoryName.replace(/ /g, "-").toLowerCase();
    push(`/home/${category}/${project}`);
  };

  return (
    <Fragment>
      {projects.length > 0 && (
        <div className={styleClasses}>
          <div className={classes.ProjectsHeader}>
            <h4>{categoryName}</h4>
            <Link className={classes.SeeAllLink} href={"/collection"}>
              See All
            </Link>
          </div>
          <div className={classes.ProjectsBody}>
            <Swiper spaceBetween={50} slidesPerView={5}>
              {projects.map((project) => {
                return (
                  <SwiperSlide key={project.name}>
                    <SwipperProjectBox
                      name={project.name}
                      image={project.image}
                      status={project.status}
                      type={categoryName}
                      onClicked={goToDetailsPage}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Projects;
