import Badges from "../../app/basic-ui/Badges";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Badges />}</>;
};

export default DashboardPage;
