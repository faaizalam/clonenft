import SimpleLine from "../../app/icons/SimpleLine";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <SimpleLine />}</>;
};

export default DashboardPage;
