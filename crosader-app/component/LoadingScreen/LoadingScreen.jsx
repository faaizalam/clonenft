import classes from "./LoadingScreen.module.scss";
import logoImage from "../../component/assests/Nft.webp"

const LoadingScreen = ({ showText, text = "Crosader Loading.." }) => {
  return (
    <div className={classes.LoadingScreen}>
      {/* <div className="flex w-[100%] justify-center translate-y-64 item-center"> */}
      <img src="/Images/Nft.webp" alt="  Logo" className="absolute w-[200px]"/>
      <div className={classes.pdiv}>{showText && <h3>{text}</h3>}</div>
     
 </div>
  );
};

export default LoadingScreen;
