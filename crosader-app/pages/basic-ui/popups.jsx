import dynamic from "next/dynamic";

const isBrowser = typeof window !== "undefined";
const Popups = dynamic(() => import("../../app/basic-ui/Popups"), {
  ssr: false,
});

const DashboardPage = () => {
  return <>{isBrowser && <Popups />}</>;
};

export default DashboardPage;
