import BlankPage from "../../app/general-pages/BlankPage";
import NewsGrid from "../../app/general-pages/NewsGrid";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <NewsGrid />}</>;
};

export default DashboardPage;
