import Orders from "../../app/ecommerce/Orders";
import BlankPage from "../../app/general-pages/BlankPage";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Orders />}</>;
};

export default DashboardPage;
