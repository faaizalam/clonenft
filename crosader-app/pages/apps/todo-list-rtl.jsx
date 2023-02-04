import TodoListRtl from "../../app/apps/TodoListRtl";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <TodoListRtl />}</>;
};

export default DashboardPage;
