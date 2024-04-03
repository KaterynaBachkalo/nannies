import { FC, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { ReactComponent as IconChevron } from "../../img/chevron-down.svg";
import css from "./Filters.module.css";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import useCloseDropdown from "../../services/closeDropdown";

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

  const dropdownref = useRef<HTMLDivElement | null>(null);
  const iconref = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const handleSelect = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter);
    dispatch(setFilter(selectedFilter));
  };

  const onClose = () => {
    setOpenDropdown(false);
  };

  useCloseDropdown(onClose, dropdownref, iconref);

  return (
    <>
      <p className={css.title}>Filters</p>
      <div className={css.wrap}>
        <button
          type="button"
          className={css.btnInput}
          onClick={() => {
            setOpenDropdown(!isOpenDropdown);
          }}
        >
          {selectedFilter}
          <IconChevron ref={iconref} />
        </button>

        {isOpenDropdown && (
          <div className={css.dropdown} onClick={onClose} ref={dropdownref}>
            <ul className={css.list}>
              {options.map((opt) => (
                <li
                  key={nanoid()}
                  className={css.item}
                  onClick={() => handleSelect(opt)}
                  defaultValue={defaultFilter}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;
