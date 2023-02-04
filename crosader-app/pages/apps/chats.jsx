import Chats from "../../app/apps/Chats";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Chats />}</>;
};

export default DashboardPage;
