import BlankPage from "../../app/general-pages/BlankPage";
import Profile from "../../app/general-pages/Profile";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Profile />}</>;
};

export default DashboardPage;
