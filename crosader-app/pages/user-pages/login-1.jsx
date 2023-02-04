import Login from "../../app/user-pages/Login";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Login />}</>;
};

export default DashboardPage;
