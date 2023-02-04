import Widgets from "../app/widgets/Widgets";
const isBrowser = typeof window !== "undefined";

const WidgetsComponent = () => {
  return <>{isBrowser && <Widgets />}</>;
};

export default WidgetsComponent;
