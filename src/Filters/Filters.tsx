import { FC, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { ReactComponent as IconChevron } from "../img/chevron-down.svg";
import css from "./Filters.module.css";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/filterSlice";
import useCloseModals from "../services/closeModals";

const Filters: FC = () => {
  const defaultFilter = "Show all";

  const options: string[] = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const [isOpenDropdown, setOpenDropdown] = useState(false);

  const dropdownref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleClick = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter);
    dispatch(setFilter(selectedFilter));
  };

  const onClose = () => {
    setOpenDropdown(false);
  };

  useCloseModals(onClose, dropdownref);

  return (
    <div className={css.container}>
      <p className={css.title}>Filters</p>
      <div className={css.wrap}>
        <button
          type="button"
          className={css.btnInput}
          onClick={() => setOpenDropdown(!isOpenDropdown)}
        >
          {selectedFilter}
          <IconChevron />
        </button>

        {isOpenDropdown && (
          <div className={css.dropdown} ref={dropdownref} onClick={onClose}>
            <ul className={css.list}>
              {options.map((opt) => (
                <li
                  key={nanoid()}
                  className={css.item}
                  onClick={() => handleClick(opt)}
                  defaultValue={defaultFilter}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
