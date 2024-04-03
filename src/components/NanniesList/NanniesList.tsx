import { FC, useEffect, useState } from "react";
import NanniesCard from "../NanniesCard/NanniesCard";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { INanny } from "../../types";
import css from "./NanniesList.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectCurrentPage,
  selectFilter,
  selectIsLoading,
} from "../../redux/selectors";
import {
  setCurrentPage,
  setError,
  setLoading,
  setNannies,
  setNextPage,
} from "../../redux/nanniesSlice";
import Loader from "../Loader/Loader";
import { nanoid } from "nanoid";

const NanniesList: FC = () => {
  const isLoading = useSelector(selectIsLoading);
  const filter = useSelector(selectFilter);

  const [loadedNannies, setLoadedNannies] = useState<INanny[]>([]);
  const [visibleNannies, setVisibleNannies] = useState<INanny[]>([]);

  const nanniesPerPage = 3;
  const currentPage = useSelector(selectCurrentPage);

  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(setNextPage());
    const startIndex = currentPage * nanniesPerPage;
    const endIndex = startIndex + nanniesPerPage;
    const newVisibleNannies = loadedNannies.slice(startIndex, endIndex);
    setVisibleNannies([...visibleNannies, ...newVisibleNannies]);
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const unsubscribe = onValue(ref(db), (snapshot) => {
        const data = snapshot.val();

        if (data) {
          dispatch(setNannies(data));
          setLoadedNannies(data);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  }, [dispatch]);

  useEffect(() => {
    if (loadedNannies.length > 0) {
      let filteredNannies = [...loadedNannies];

      switch (filter) {
        case "A to Z":
          filteredNannies.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z to A":
          filteredNannies.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "Less than 10$":
          filteredNannies = filteredNannies.filter(
            (nanny) => nanny.price_per_hour <= 10
          );
          break;
        case "Greater than 10$":
          filteredNannies = filteredNannies.filter(
            (nanny) => nanny.price_per_hour > 10
          );
          break;
        case "Popular":
          filteredNannies.sort((a, b) => b.rating - a.rating);
          break;
        case "Not popular":
          filteredNannies.sort((a, b) => a.rating - b.rating);
          break;
        case "Show all":
        default:
          break;
      }

      setVisibleNannies(filteredNannies.slice(0, currentPage * nanniesPerPage));
    }
  }, [filter, loadedNannies, currentPage]);

  return (
    <>
      <div className={css.list}>
        {!isLoading && visibleNannies.length === 0 ? (
          <p>No nannies found with the selected criteria</p>
        ) : (
          <div className={css.list}>
            {visibleNannies.map((nanny: INanny) => (
              <NanniesCard key={nanoid()} nanny={nanny} />
            ))}
          </div>
        )}
      </div>
      {loadedNannies.length > visibleNannies.length &&
        visibleNannies.length !== 0 && (
          <div className={css.btnWrap}>
            <button onClick={handleLoadMore} className={css.btnLoadMore}>
              Load more
            </button>
          </div>
        )}

      {isLoading && !visibleNannies && <Loader />}
    </>
  );
};

export default NanniesList;
