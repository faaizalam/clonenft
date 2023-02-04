import Modals from "../../app/basic-ui/Modals";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Modals />}</>;
};

export default DashboardPage;
