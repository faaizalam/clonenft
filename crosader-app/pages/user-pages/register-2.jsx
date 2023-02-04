import Login from "../../app/user-pages/Login";
import Register2 from "../../app/user-pages/Register2";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Register2 />}</>;
};

export default DashboardPage;
