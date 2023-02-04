import BlankPage from "../../app/general-pages/BlankPage";
import SearchResults from "../../app/general-pages/SearchResults";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <SearchResults />}</>;
};

export default DashboardPage;
