import React from "react";
import NanniesList from "../../components/NanniesList/NanniesList";
import Filters from "../../components/Filters/Filters";
import css from "./NanniesPage.module.css";

const NanniesPage = () => {
  return (
    <section className={css.container}>
      <Filters />
      <NanniesList />
    </section>
  );
};

export default NanniesPage;
