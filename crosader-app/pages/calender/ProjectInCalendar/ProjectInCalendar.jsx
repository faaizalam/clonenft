import moment from "moment";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import classes from "./ProjectInCalendar.module.scss";

const ProjectInCalendar = ({ name, date, status, type, isTBA }) => {
  const router=useRouter()
  // const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  let styleClasses = classes.ProjectInCalendar;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  if (type === "primary") {
    styleClasses = [styleClasses, classes.Primary].join(" ");
  }

  const goToDetailsPage = (projectName) => {
    const url = projectName.replace(/ /g, "-").toLowerCase();
    router.push(`/calender/${url}`);
  };

  return (
    <button className={styleClasses} onClick={() => goToDetailsPage(name)}>
      <div>
        <p>{name}</p>

        {isTBA ? (
          <p>Date: TBA</p>
        ) : (
          <p>{moment.unix(date).format("ddd, MMM Do")}</p>
        )}
      </div>
      <div>
        <p>{status}</p>
        {isTBA ? (
          <p>Time: TBA</p>
        ) : (
          <p>{`${moment.unix(date).format("hh:mm A")} Local / ${moment
            .unix(date)
            .utc()
            .format("hh:mm A")} UTC`}</p>
        )}
      </div>
    </button>
  );
};

export default ProjectInCalendar;
