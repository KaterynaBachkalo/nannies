import React, { FC, LegacyRef, RefObject, useRef } from "react";
import { generateTime } from "../../services/generateTime";
import css from "./TimeMenu.module.css";
import useCloseDropdown from "../../services/closeDropdown";

interface IProps {
  onSelect: (value: string) => void;
  onClose: (value: boolean) => void;
  ref: LegacyRef<HTMLDivElement>;
}

const TimeMenu: FC<IProps> = React.forwardRef(({ onSelect, onClose }, ref) => {
  const timeOptions = generateTime();

  const handleClick = (selectedTime: string) => {
    onSelect(selectedTime);
  };

  const inputRef = useRef(null);

  useCloseDropdown(onClose, inputRef, ref as RefObject<HTMLDivElement>);

  return (
    <div className={css.dropDown} ref={inputRef}>
      <p className={css.timeTitle}>Meeting time</p>
      <ul className={css.timeList}>
        {timeOptions.map((time) => (
          <li
            key={time}
            onClick={() => handleClick(time)}
            className={css.timeItem}
          >
            {time}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TimeMenu;
