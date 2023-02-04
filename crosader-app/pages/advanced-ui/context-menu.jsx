import ContextMenuPage from "../../app/advanced-ui/ContextMenus";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <ContextMenuPage />}</>;
};

export default DashboardPage;
