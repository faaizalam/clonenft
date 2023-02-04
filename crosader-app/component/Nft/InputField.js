import { useSelector } from "react-redux";
import Icons from "../../pages/icons/icon";
import classes from "./InputField.module.scss";

const InputField = ({ value, placeholder, type = "text", icon, onChanged }) => {
  const { theme } = useSelector((state) => state.theme);
  let styleClasses = classes.InputField;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  if (theme === "dark") {
    styleClasses = [styleClasses, classes.Dark].join(" ");
  }

  return (
    // <di>h</di>
    <div className={styleClasses}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChanged}
      />
      {/* {icon && <Icons name={icon} />} */}
    </div>
  );
};

export default InputField;



