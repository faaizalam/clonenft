import Accordions from "../../app/basic-ui/Accordions";
import SparkLineCharts from "../../app/charts/SparkLineCharts";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <SparkLineCharts />}</>;
};

export default DashboardPage;
