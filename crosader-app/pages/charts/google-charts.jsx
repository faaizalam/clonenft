import Accordions from "../../app/basic-ui/Accordions";
import GoogleCharts from "../../app/charts/GoogleCharts";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <GoogleCharts />}</>;
};

export default DashboardPage;
