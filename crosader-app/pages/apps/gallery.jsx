import GalleryPage from "../../app/apps/Gallery";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <GalleryPage />}</>;
};

export default DashboardPage;
