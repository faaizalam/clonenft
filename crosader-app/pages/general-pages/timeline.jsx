import BlankPage from "../../app/general-pages/BlankPage";
import Timeline from "../../app/general-pages/Timeline";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Timeline />}</>;
};

export default DashboardPage;
