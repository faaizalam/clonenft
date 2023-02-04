import Dropdowns from "../../app/basic-ui/Dropdowns";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Dropdowns />}</>;
};

export default DashboardPage;
