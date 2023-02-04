import Button from "../../app/basic-ui/Buttons";
const isBrowser = typeof window !== "undefined";

const DashboardPage = () => {
  return <>{isBrowser && <Button />}</>;
};

export default DashboardPage;
