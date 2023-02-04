import FontAwesome from "../../app/icons/FontAwesome";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <FontAwesome />}</>;
};

export default DashboardPage;
