import React from "react";
import Favorites from "../../components/Favorites/Favorites";
import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  return (
    <section className={css.container}>
      <Favorites />
    </section>
  );
};

export default FavoritesPage;
