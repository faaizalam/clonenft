import Error404 from "../../app/error-pages/Error404";
import Login from "../../app/user-pages/Login";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Error404 />}</>;
};

export default DashboardPage;
