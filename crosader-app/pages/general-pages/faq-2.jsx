import BlankPage from "../../app/general-pages/BlankPage";
import Faq2 from "../../app/general-pages/Faq2";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Faq2 />}</>;
};

export default DashboardPage;
