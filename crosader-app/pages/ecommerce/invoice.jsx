import Invoice from "../../app/ecommerce/Invoice";
import BlankPage from "../../app/general-pages/BlankPage";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Invoice />}</>;
};

export default DashboardPage;
