import Accordions from "../../app/basic-ui/Accordions";
import C3Charts from "../../app/charts/C3Charts";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <C3Charts />}</>;
};

export default DashboardPage;
