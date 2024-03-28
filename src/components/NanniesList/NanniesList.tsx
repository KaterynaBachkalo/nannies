import React, { useEffect } from "react";
import NanniesCard from "../NanniesCard/NanniesCard";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { INanny } from "../../types";
import css from "./NanniesList.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectNannies } from "../../redux/selectors";
import { setNannies } from "../../redux/nanniesSlice";

const NanniesList = () => {
  const nannies = useSelector(selectNannies);

  const dispatch = useDispatch();

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
    <div className={css.back}>
      <div className={css.container}>
        <div className={css.list}>
          {nannies &&
            nannies.map((nanny: INanny) => (
              <NanniesCard key={nanny.name} nanny={nanny} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NanniesList;
