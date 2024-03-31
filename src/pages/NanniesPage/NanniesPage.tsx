import React from "react";
import NanniesList from "../../components/NanniesList/NanniesList";
import Filters from "../../components/Filters/Filters";

const NanniesPage = () => {
  return (
    <>
      <Filters />
      <NanniesList />
    </>
  );
};

export default NanniesPage;
