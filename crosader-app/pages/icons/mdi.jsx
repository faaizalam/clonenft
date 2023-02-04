import Mdi from "../../app/icons/Mdi";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Mdi />}</>;
};

export default DashboardPage;
