import { useState } from "react";
import { useSelector } from "react-redux";
import Icons from "../../../pages/icons/icon";
import classes from "./AttributeLink.module.scss";

const AttributeLink = ({ name, link, contractLink, contractInfo, mailTo }) => {
  const { theme } = useSelector((state) => state.theme);
  const [isCopied, setIsCopied] = useState(false);

  let styleClasses = classes.AttributeLink;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const openLink = () => {
    if (contractLink)
      return window.open(`https://cronoscan.com/token/${link}#balances`);
    if (contractInfo)
      return window.open(`https://cronoscan.com/token/${link}#tokenInfo`);
    window.open(link);
  };

  return (
    <div className={styleClasses}>
      <p className={classes.AttributeName}>{name}</p>
      {isCopied && <span className={classes.CopyMessage}>Copied!</span>}
      <div className={classes.LinkButtons}>
        <button className={classes.OpenButton} onClick={openLink}>
          <div className="svgs">
          <Icons  name="open" />

          </div>
        </button>
        <button className={classes.CopyButton} onClick={copyLink}>
       
          <Icons name="copy"/>
          {/* </div> */}
        </button>
      </div>
    </div>
  );
};

export default AttributeLink;
