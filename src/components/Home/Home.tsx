import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";
import { ReactComponent as IconCheck } from "../../img/check.svg";
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.maincontainer}>
      <div className={`${css.container} ${css.background}`}>
        <div className={css.header}>
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
              </div>
              <div className={css.wrapButtons}>
                <li>
                  <button type="button" className={css.btnLogin}>
                    Login
                  </button>
                </li>
                <li>
                  <button type="button" className={css.btnRegistration}>
                    Registration
                  </button>
                </li>
              </div>
            </ul>
          </nav>
        </div>
        <div className={css.wrapTitles}>
          <p className={css.title}>Make Life Easier for the Family:</p>
          <p className={css.subtitle}>
            Find Babysitters Online for All Occasions
          </p>
          <Link to="/nannies" className={css.linkGet}>
            Get started
            <FaArrowUp className={css.arrow} />
          </Link>
        </div>

        <div className={css.block}>
          <div className={css.sign}>
            <IconCheck className={css.check} />
          </div>
          <div>
            <p className={css.blockTitle}>Experienced nannies</p>
            <p className={css.blockText}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
