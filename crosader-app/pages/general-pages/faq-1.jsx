import BlankPage from "../../app/general-pages/BlankPage";
import Faq from "../../app/general-pages/Faq";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Faq />}</>;
};

export default DashboardPage;
