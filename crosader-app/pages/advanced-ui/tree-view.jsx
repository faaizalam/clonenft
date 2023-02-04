import TreeView from "../../app/advanced-ui/TreeView";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <TreeView />}</>;
};

export default DashboardPage;
