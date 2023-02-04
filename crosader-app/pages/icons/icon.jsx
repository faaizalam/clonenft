import Calendar from "./Calendar";
import Home from "./Home";
import Info from "./Info";
import Stats from "./Stats";
import Magnifier from "./Magnifier";
import MobileFooter from "./MobileFooter";
import StatusBar from "./StatusBar";
import NFT from "./NFT";
import Pencil from "./Pencil";
import Sun from "./Sun";
import Crescent from "./Crescent";
import Chevron from "./Chevron";
import Copy from "./Copy";
import Status from "./Status";
import HeartFilled from "./HeartFilled";
import Filter from "./Filter";
import Open from "./Open";
import Twitter from "./Twitter";
import SortUp from "./SortUp";
import SortDown from "./SortDown";
import Shuffle from "./Shuffle";

const Icons = (props) => {
  let iconElement = null;

  switch (props.name) {
    case "calendar":
      iconElement = <Calendar {...props} />;
      break;

    case "chevron":
      iconElement = <Chevron {...props} />;
      break;

    case "copy":
      iconElement = <Copy {...props} />;
      break;

    case "crescent":
      iconElement = <Crescent {...props} />;
      break;

    case "filter":
      iconElement = <Filter {...props} />;
      break;

    case "heart-filled":
      iconElement = <HeartFilled {...props} />;
      break;

    case "stats":
      iconElement = <Stats {...props} />;
      break;

    case "home":
      iconElement = <Home {...props} />;
      break;

    case "info":
      iconElement = <Info {...props} />;
      break;

    case "magnifier":
      iconElement = <Magnifier {...props} />;
      break;

    case "mobileFooter":
      iconElement = <MobileFooter {...props} />;
      break;

    case "statusBar":
      iconElement = <StatusBar {...props} />;
      break;

    case "nft":
      iconElement = <NFT {...props} />;
      break;

    case "open":
      iconElement = <Open {...props} />;
      break;

    case "pencil":
      iconElement = <Pencil {...props} />;
      break;

    case "status":
      iconElement = <Status {...props} />;
      break;

    case "sun":
      iconElement = <Sun {...props} />;
      break;

    case "twitter":
      iconElement = <Twitter {...props} />;
      break;
    case "sortUp":
      iconElement = <SortUp {...props} />;
      break;
    case "sortDown":
      iconElement = <SortDown {...props} />;
      break;
    case "shuffle":
      iconElement = <Shuffle {...props} />;
      break;

    default:
      break;
  }
  return iconElement;
};

export default Icons;
