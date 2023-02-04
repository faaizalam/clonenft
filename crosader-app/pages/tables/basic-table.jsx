import BasicTable from "../../app/tables/BasicTable";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <BasicTable />}</>;
};

export default DashboardPage;
