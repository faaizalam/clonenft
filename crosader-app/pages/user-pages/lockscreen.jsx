import LockScreen from "../../app/user-pages/Lockscreen";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <LockScreen />}</>;
};

export default DashboardPage;
