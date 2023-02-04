import BlankPage from "../../app/general-pages/BlankPage";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <BlankPage />}</>;
};

export default DashboardPage;
