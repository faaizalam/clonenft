import Wizard from "../../app/form-elements/Wizard";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Wizard />}</>;
};

export default DashboardPage;
