import ReactTablePage from "../../app/tables/ReactTable";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <ReactTablePage />}</>;
};

export default DashboardPage;
