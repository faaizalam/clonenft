import dynamic from "next/dynamic";

const GuageChart = dynamic(() => import("../../app/charts/GuageChart"), {
  ssr: false,
});
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <GuageChart />}</>;
};

export default DashboardPage;
