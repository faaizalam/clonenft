import DataTables from "../../app/tables/DataTables";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <DataTables />}</>;
};

export default DashboardPage;
