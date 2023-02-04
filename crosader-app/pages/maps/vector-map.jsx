import dynamic from "next/dynamic";

const isBrowser = typeof window !== "undefined";
const VectorMapPage = dynamic(() => import("../../app/maps/VectorMap"), {
  ssr: false,
});
const DashboardPage = () => {
  return <>{isBrowser && <VectorMapPage />}</>;
};

export default DashboardPage;
