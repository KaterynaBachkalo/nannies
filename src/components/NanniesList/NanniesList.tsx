import { FC, useEffect, useState } from "react";
import NanniesCard from "../NanniesCard/NanniesCard";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { INanny } from "../../types";
import css from "./NanniesList.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCurrentPage, selectIsLoading } from "../../redux/selectors";
import {
  setCurrentPage,
  setError,
  setLoading,
  setNannies,
  setNextPage,
} from "../../redux/nanniesSlice";
import Loader from "../Loader/Loader";

const NanniesList: FC = () => {
  const isLoading = useSelector(selectIsLoading);

  const [loadedNannies, setLoadedNannies] = useState<INanny[]>([]);
  const [visibleNannies, setVisibleNannies] = useState<INanny[]>([]);

  const nanniesPerPage = 3;
  const currentPage = useSelector(selectCurrentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const unsubscribe = onValue(ref(db), (snapshot) => {
        const data = snapshot.val();

        if (data) {
          dispatch(setNannies(data));
          setLoadedNannies(data);
          setVisibleNannies(data.slice(0, nanniesPerPage));
        }
      });
      return () => unsubscribe();
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(setNextPage());
    const startIndex = currentPage * nanniesPerPage;
    const endIndex = startIndex + nanniesPerPage;
    const newVisibleNannies = loadedNannies.slice(startIndex, endIndex);
    setVisibleNannies([...visibleNannies, ...newVisibleNannies]);
    setCurrentPage(currentPage);
  };

  return (
    <div className={css.back}>
      <div className={css.container}>
        <div className={css.list}>
          {visibleNannies?.map((nanny: INanny) => (
            <NanniesCard key={nanny.name} nanny={nanny} />
          ))}
        </div>
        {loadedNannies.length > visibleNannies.length && (
          <div className={css.btnWrap}>
            <button onClick={handleLoadMore} className={css.btnLoadMore}>
              Load more
            </button>
          </div>
        )}
      </div>
      {isLoading && !visibleNannies && <Loader />}
    </div>
  );
};

export default NanniesList;
