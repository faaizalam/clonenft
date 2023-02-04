
import Datetime from "react-datetime";
import moment from "moment";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Iframe from "../Ui/Ifram/ifram";


const FormInput = ({
  name,
  label,
  value,
  onChangeHandler,
  type = "text",
  placeholder,
  required,
  defaultValue,
}) => {
  let inputProps = {
    
    name,
  };
  const getInput = () => {
    switch (type) {
      case "date":
        return (
          <div>

          <Datetime  
            cla
            initialValue={defaultValue && moment.unix(defaultValue)}
            
            utc
            locale={"UTC"}
            inputProps={inputProps}
            displayTimeZone={true}
            
            placeholder={placeholder}
            className="date_time_picker"
            
            />
            </div>
        );

      case "editor":
        return (
          <div>
            <div
              className={`${false ? "w-1/2 ml-4" : "w-[660px]"
                } rounded border-2 mb-2 bg-white overflow-auto h-[200px]`}
            >
              <Iframe content={value} />
            </div>
            <CodeMirror
              value={defaultValue}
              name={name}
              onChange={onChangeHandler}
              height="200px"
              width="660px"
              extensions={[javascript({ jsx: true })]}
            />
          </div>
        );

      default:
        return (
          <input color="black"
            className={`py-3 px-6  ${type === "checkbox"
                ? ""
                : "focus:border-[#6D28D9] col-span-4 max-w-[686px] rounded-lg w-full outline-none  border border-[#D1D5DB] text-gray-600 focus:text-gray-700 text-base leading-4"
              }`}
            name={name}
            defaultChecked={defaultValue}
            defaultValue={defaultValue}
            required={required ?? false}
            onChange={onChangeHandler}
            type={type}
            placeholder={placeholder}
          />
        );
    }
  };
  return (
    <div className="grid grid-cols-7  items-center">
      <label
        htmlFor={name}
        className="text-gray-600 col-span-2 text-lg leading-[15px]"
      >
        {label}
      </label>
      {getInput()}
    </div>
  );
};

export default FormInput;
