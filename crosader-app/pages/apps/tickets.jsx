import Tickets from "../../app/apps/Tickets";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Tickets />}</>;
};

export default DashboardPage;
