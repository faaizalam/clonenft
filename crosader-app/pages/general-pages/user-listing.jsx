import BlankPage from "../../app/general-pages/BlankPage";
import UserListing from "../../app/general-pages/UserListing";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <UserListing />}</>;
};

export default DashboardPage;
