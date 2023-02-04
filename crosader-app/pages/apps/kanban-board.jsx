import KanbanBoard from "../../app/apps/KanbanBoard";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <KanbanBoard />}</>;
};

export default DashboardPage;
