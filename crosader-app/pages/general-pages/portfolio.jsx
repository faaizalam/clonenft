import BlankPage from "../../app/general-pages/BlankPage";
import Portfolio from "../../app/general-pages/Portfolio";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Portfolio />}</>;
};

export default DashboardPage;
