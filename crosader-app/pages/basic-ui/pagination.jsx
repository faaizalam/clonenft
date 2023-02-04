import Paginations from "../../app/basic-ui/Paginations";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Paginations />}</>;
};

export default DashboardPage;
