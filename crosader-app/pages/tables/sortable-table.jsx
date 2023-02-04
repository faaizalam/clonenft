import SortableTable from "../../app/tables/SortableTable";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <SortableTable />}</>;
};

export default DashboardPage;
