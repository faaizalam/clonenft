import Accordions from "../../app/basic-ui/Accordions";
import Chartist from "../../app/charts/Chartist";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Chartist />}</>;
};

export default DashboardPage;
