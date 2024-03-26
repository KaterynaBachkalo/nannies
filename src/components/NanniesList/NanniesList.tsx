import React, { useEffect, useState } from "react";
import NanniesCard from "../NanniesCard/NanniesCard";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { INanny } from "../../types";
import css from "./NanniesList.module.css";

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);

  useEffect(() => {
    const unsubscribe = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setNannies(data);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={css.back}>
      <div className={css.container}>
        <div className={css.list}>
          {nannies.length !== 0 &&
            nannies.map((nanny: INanny) => (
              <NanniesCard key={nanny.name} nanny={nanny} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NanniesList;
