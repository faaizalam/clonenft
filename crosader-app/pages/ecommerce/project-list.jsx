import ProjectList from "../../app/ecommerce/ProjectList";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <ProjectList />}</>;
};

export default DashboardPage;
