import BlankPage from "../../app/general-pages/BlankPage";
import LandingPage from "../../app/general-pages/LandingPage";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <LandingPage />}</>;
};

export default DashboardPage;
