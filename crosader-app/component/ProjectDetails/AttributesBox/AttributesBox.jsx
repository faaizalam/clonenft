import { useSelector } from "react-redux";
import classes from "./AttributesBox.module.scss";

const AttributesBox = ({ heading, children, subText }) => {
  const { theme } = useSelector((state) => state.theme);
  let styleClasses = classes.Attributes;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  return (
    <div className={styleClasses}>
      <h4 className={classes.AttributesHeading}>
        {heading}
        <span>{subText}</span>
      </h4>
      {children} 
    </div>
  );
};

export default AttributesBox;
