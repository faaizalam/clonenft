import dynamic from "next/dynamic";

const isBrowser = typeof window !== "undefined";
const BasicElements = dynamic(
  () => import("../../app/form-elements/BasicElements"),
  {
    ssr: false,
  }
);
const DashboardPage = () => {
  return <>{isBrowser && <BasicElements />}</>;
};

export default DashboardPage;
