import { useEffect } from "react";
import { useSelector } from "react-redux";
import icons from "../../pages/icons/icon";
import Image from "../Image";
import classes from "./SwipperProjectBox.module.scss";

const SwipperProjectBox = ({ name, image, status, type, onClicked }) => {
  const { theme } = useSelector((state) => state.theme);

  let smallName = name;
  let continueName = null;
  if (smallName.length > 25) {
    smallName = smallName.slice(0, 27).trim();
    continueName = "...";
  }

  let styleClasses = classes.SwipperProjectBox;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  return (
    <div className={styleClasses} onClick={() => onClicked(name)}>
      <Image className={classes.ProjectImage} src={image} alt="" />
      <h5 className={classes.ProjectName}>
        {smallName}
        {continueName}
      </h5>
      <small className={classes.ProjectStatus}>
        {/* <span>
          <Icon name="status" />
        </span> */}
        {type?.toLowerCase().includes("nfts") ? `Mint: ${status}` : ""}
      </small>
    </div>
  );
};

export default SwipperProjectBox;
