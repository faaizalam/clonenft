import Login from "../../app/user-pages/Login";
import Register from "../../app/user-pages/Register";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Register />}</>;
};

export default DashboardPage;
