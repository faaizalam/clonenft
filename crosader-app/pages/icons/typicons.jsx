import TypIcons from "../../app/icons/TypIcons";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <TypIcons />}</>;
};

export default DashboardPage;
