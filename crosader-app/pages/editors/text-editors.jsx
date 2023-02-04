import dynamic from "next/dynamic";

const isBrowser = typeof window !== "undefined";
const TextEditors = dynamic(() => import("../../app/editors/TextEditors"), {
  ssr: false,
});
const DashboardPage = () => {
  return <>{isBrowser && <TextEditors />}</>;
};

export default DashboardPage;
