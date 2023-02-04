import TodoList from "../../app/apps/TodoList";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <TodoList />}</>;
};

export default DashboardPage;
