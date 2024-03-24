import React, { useEffect } from "react";
import NanniesCard from "../NanniesCard/NanniesCard";
import { useSelector } from "react-redux";
import { selectNannies } from "../../redux/selectors";
import { getDatabase } from "firebase/database";
import { app } from "../../firebase";

const NanniesList = () => {
  const nannies = useSelector(selectNannies);
  console.log(nannies);

  useEffect(() => {
    const db = getDatabase(app);

    console.log(db);
  }, []);
  return (
    <>
      <NanniesCard />
    </>
  );
};

export default NanniesList;
