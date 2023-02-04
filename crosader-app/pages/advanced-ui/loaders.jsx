import Loaders from "../../app/advanced-ui/Loaders";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Loaders />}</>;
};

export default DashboardPage;
