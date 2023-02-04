import Typography from "../../app/basic-ui/Typography";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Typography />}</>;
};

export default DashboardPage;
