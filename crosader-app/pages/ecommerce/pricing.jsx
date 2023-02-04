import Pricing from "../../app/ecommerce/Pricing";
import BlankPage from "../../app/general-pages/BlankPage";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Pricing />}</>;
};

export default DashboardPage;
