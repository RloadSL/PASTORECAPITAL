import React, { useState } from "react";
import style from "./cookie-advicer.module.scss";

interface CookieSwitcherProps {
  handleToggle: Function;
  isDisabled?: boolean;
  inputName: string;
}

const CookieSwitcher = ({ handleToggle, inputName, isDisabled = false }: CookieSwitcherProps) => {
  const [isSwitcherActive, setIsSwitcherActive] = useState(true);

  return (
    <div className={style.switchCheckbox}>
      <input
        className={style.switchCheckbox_input}
        id={inputName}
        type="checkbox"
        checked={isSwitcherActive}
        onChange={(e) => {
          setIsSwitcherActive(e.target.checked);
          handleToggle({ [inputName]: e.target.checked });
        }}
        disabled={isDisabled}
        name={inputName}
      />
      <label
        style={{ background: isSwitcherActive ? "#06D6A0" : "grey", opacity: isDisabled ? "0.5" : 1 }}
        className={style.switchCheckbox_label}
        htmlFor={inputName}
      >
        <span className={style.switchCheckbox_button} />
      </label>
    </div>
  );
};

export default CookieSwitcher;
