import FlagIcons from "../../app/icons/FlagIcons";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <FlagIcons />}</>;
};

export default DashboardPage;
