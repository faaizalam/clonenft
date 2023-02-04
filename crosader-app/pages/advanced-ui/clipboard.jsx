import ClipboardPage from "../../app/advanced-ui/Clipboards";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <ClipboardPage />}</>;
};

export default DashboardPage;
