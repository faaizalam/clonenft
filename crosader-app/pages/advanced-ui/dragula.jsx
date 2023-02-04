import Dragula from "../../app/advanced-ui/Dragula";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Dragula />}</>;
};

export default DashboardPage;
