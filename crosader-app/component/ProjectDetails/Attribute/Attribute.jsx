import { useState } from "react";
import { useSelector } from "react-redux";
import Icons from "../../../pages/icons/icon";
import classes from "./Attribute.module.scss";

const Attribute = ({ name, value, showCopy = false }) => {
  const { theme } = useSelector((state) => state.theme);
  const [isCopied, setIsCopied] = useState(false);

  let styleClasses = classes.Attribute;

  if (theme === "light") {
    styleClasses = [classes.Attribute, classes.Light].join(" ");
  }

  const copyValue = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className={styleClasses}>
      <p className={classes.AttributeName}>{name}</p>
      {isCopied && <span className={classes.CopyMessage}>Copied!</span>}
      {!showCopy && <p className={classes.AttributeValue}>{value}</p>}
      {showCopy && (
        <button className={classes.CopyButton} onClick={copyValue}>
          <Icons name="copy" />
        </button>
      )}
    </div>
  );
};

export default Attribute;
