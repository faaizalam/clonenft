import classes from "./TabMenu.module.scss";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";

const TabMenu = ({ header, options, hideAll, onChanged, customClasses }) => {
  const { theme } = useSelector((state) => state.theme);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(header);

  let styleClasses = classes.Dropdown;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  if (isOpen) {
    styleClasses = [styleClasses, classes.Open].join(" ");
  }

  if (customClasses) {
    styleClasses = [styleClasses, customClasses].join(" ");
  }

  const selectOption = (option) => {
    onChanged(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const isSelected = (option) => {
    return selectedOption === option;
  };

  return (
    <div className={styleClasses}>
      <div className={classes.TabContainer}>
        {!hideAll && (
          <Badge
            className={
              isSelected("All") ? classes.TabOptionActive : classes.TabOption
            }
            onClick={() => selectOption("All")}
          >
            All
          </Badge>
        )}
        {options.map((option, i) => {
          return (
            <Badge
              key={i}
              className={
                isSelected(option) ? classes.TabOptionActive : classes.TabOption
              }
              onClick={() => selectOption(option)}
            >
              {option}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default TabMenu;
