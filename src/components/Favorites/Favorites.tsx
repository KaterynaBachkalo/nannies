// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectFavoritesNannies,
  selectIsLoading,
  selectNannies,
} from "../../redux/selectors";
import { useEffect } from "react";
import { setNannies } from "../../redux/nanniesSlice";
import css from "./Favorites.module.css";
import Loader from "../Loader/Loader";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { INanny } from "../../types";
import NanniesCard from "../NanniesCard/NanniesCard";

const Favorites = () => {
  const dispatch = useDispatch();

  const nannies: INanny[] = useSelector(selectNannies);

  const isLoading = useSelector(selectIsLoading);

  const favorites = useSelector(selectFavoritesNannies);

  useEffect(() => {
    const unsubscribe = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        dispatch(setNannies(data));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      {favorites.length !== 0 ? (
        <div className={css.list}>
          {nannies
            ?.filter((nanny) => favorites.includes(nanny.name))
            .map((nanny) => (
              <NanniesCard key={nanny.name} nanny={nanny} />
            ))}
        </div>
      ) : (
        <p className={css.emptyFavorites}>Your favorite cars may be here!</p>
      )}
      {isLoading && !nannies && <Loader />}
    </>
  );
};

export default Favorites;
