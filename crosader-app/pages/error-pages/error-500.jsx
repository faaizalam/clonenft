import Error500 from "../../app/error-pages/Error500";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Error500 />}</>;
};

export default DashboardPage;
