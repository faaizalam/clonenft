import Themify from "../../app/icons/Themify";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Themify />}</>;
};

export default DashboardPage;
