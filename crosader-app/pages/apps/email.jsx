import Email from "../../app/apps/Email";
import TodoListRtl from "../../app/apps/TodoListRtl";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Email />}</>;
};

export default DashboardPage;
