import AdvancedElements from "../../app/form-elements/AdvancedElements";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <AdvancedElements />}</>;
};

export default DashboardPage;
