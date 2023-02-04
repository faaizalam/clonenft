import Dashboard from "../app/dashboard/Dashboard";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Dashboard />}</>;
};

export default DashboardPage;
