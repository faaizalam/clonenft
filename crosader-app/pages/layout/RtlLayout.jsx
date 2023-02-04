import dynamic from "next/dynamic";

const isBrowser = typeof window !== "undefined";
const RtlLayout = dynamic(() => import("../../app/layout/RtlLayout"), {
  ssr: false,
});
const DashboardPage = () => {
  return <>{isBrowser && <RtlLayout />}</>;
};

export default DashboardPage;
