import Progress from "../../app/basic-ui/Progress";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Progress />}</>;
};

export default DashboardPage;
