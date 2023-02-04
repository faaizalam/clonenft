import { useRouter } from "next/router";
import Dashboard from "../app/dashboard/Dashboard";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  const router = useRouter();

  return <>{isBrowser && <Dashboard />}</>;
};

export default DashboardPage;
