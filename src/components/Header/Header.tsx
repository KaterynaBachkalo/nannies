import React from "react";
import { Link } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  return (
    <div className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <Link to="/" className={css.logo}>
            Nanny.Services
          </Link>
          <ul className={css.list}>
            <div className={css.wrapLinks}>
              <li>
                <Link to="/" className={css.home}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/nannies" className={css.nannies}>
                  Nannies
                </Link>
              </li>
              <li>
                <Link to="/nannies" className={css.favorites}>
                  Favorites
                </Link>
              </li>
            </div>
            <div className={css.wrapButtons}>
              <li>
                <p>User</p>
              </li>
              <li>
                <button type="button">Log out</button>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
