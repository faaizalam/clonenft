import TabsPage from "../../app/basic-ui/TabsPage";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <TabsPage />}</>;
};

export default DashboardPage;
