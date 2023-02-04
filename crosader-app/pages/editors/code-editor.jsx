import dynamic from "next/dynamic";

const isBrowser = typeof window !== "undefined";
const CodeEditor = dynamic(() => import("../../app/editors/CodeEditor"), {
  ssr: false,
});
const DashboardPage = () => {
  return <>{isBrowser && <CodeEditor />}</>;
};

export default DashboardPage;
