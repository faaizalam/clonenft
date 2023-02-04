import Login from "../../app/user-pages/Login";
import Login2 from "../../app/user-pages/Login2";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Login2 />}</>;
};

export default DashboardPage;
