import Accordions from "../../app/basic-ui/Accordions";
import ChartJs from "../../app/charts/ChartJs";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <ChartJs />}</>;
};

export default DashboardPage;
