import Accordions from "../../app/basic-ui/Accordions";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Accordions />}</>;
};

export default DashboardPage;
