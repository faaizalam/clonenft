import ProductCatalogue from "../../app/ecommerce/ProductCatalogue";
import BlankPage from "../../app/general-pages/BlankPage";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <ProductCatalogue />}</>;
};

export default DashboardPage;
