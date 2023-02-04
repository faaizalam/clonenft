import Notifications from "../app/notifications/Notifications";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Notifications />}</>;
};

export default DashboardPage;
