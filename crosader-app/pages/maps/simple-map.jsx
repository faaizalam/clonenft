import SimpleMap from "../../app/maps/SimpleMap";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <SimpleMap />}</>;
};

export default DashboardPage;
