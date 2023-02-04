import Breadcrumbs from "../../app/basic-ui/Breadcrumbs";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Breadcrumbs />}</>;
};

export default DashboardPage;
