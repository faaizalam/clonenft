import Icons from "../../pages/icons/icon";
import classes from "./Dropdown.module.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dropdown = ({ header, options, hideAll, onChanged, customClasses }) => {
  const { theme } = useSelector((state) => state.theme);
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(header);
  const [filteredText, setFilteredText] = useState("");

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

  const filteredOptions = () => {
    return options.filter((option) => {
      return option.toLowerCase().includes(filteredText.toLocaleLowerCase());
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFilteredText("");
        setShowMenu(false);
      }, 400);
    } else {
      setShowMenu(true);
    }
  }, [isOpen]);

  return (
    <div className={styleClasses}>
      <div className={classes.DropdownHeader}>
        <input
        
          type="checkbox"
          id="header"
          onChange={() => setIsOpen((oldState) => !oldState)}
        />
        <label htmlFor="header" className="border-solid border-2 border-white !importanty rounded ">
          {selectedOption} <Icons name="chevron" />
        </label>
      </div>
      {showMenu && (
        <div className={classes.DropdownMenu}>
          <input
            className={classes.DropdownFilter}
            type="text"
            placeholder="Filter"
            onChange={(e) => setFilteredText(e.target.value)}
          />
          {!hideAll && (
            <button
              className={classes.DropdownMenuItem}
              onClick={() => selectOption("All")}
            >
              All
            </button>
          )}
          {filteredOptions().map((option) => {
            return (
              <button
                key={option}
                className={classes.DropdownMenuItem}
                onClick={() => selectOption(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
