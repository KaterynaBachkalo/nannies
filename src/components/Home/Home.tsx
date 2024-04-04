import React, { MouseEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";
import { ReactComponent as IconCheck } from "../../img/check.svg";
import css from "./Home.module.css";
import LoginPopup from "../Popups/LoginPopup/LoginPopup";
import RegistrationPopup from "../Popups/RegistrationPopup/RegistrationPopup";
import Modal from "../Modal/Modal";

const Home = () => {
  const [isOpenLoginPopup, setOpenLoginPopup] = useState(false);
  const [isOpenRegistrationPopup, setOpenRegistrationPopup] = useState(false);

  const handleOpenLoginPopup = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenLoginPopup(true);
  };

  const handleOpenRegistrationPopup = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setOpenRegistrationPopup(true);
  };

  const closeModal = () => {
    setOpenLoginPopup(false);
    setOpenRegistrationPopup(false);
  };

  return (
    <section className={css.maincontainer}>
      <div className={`${css.container} ${css.background}`}>
        <div className={css.header}>
          <nav className={css.navigation}>
            <Link to="/" className={css.logo}>
              Nanny.Services
            </Link>
            <ul className={css.list}>
              <div className={css.wrapLinks}>
                <li>
                  <NavLink to="/" className={css.link}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/nannies" className={css.link}>
                    Nannies
                  </NavLink>
                </li>
              </div>
              <div className={css.wrapButtons}>
                <li>
                  <button
                    type="button"
                    className={css.btnLogin}
                    onClick={handleOpenLoginPopup}
                  >
                    Login
                  </button>
                </li>
                {isOpenLoginPopup && (
                  <Modal onClose={closeModal} title="Log In">
                    <LoginPopup onClose={closeModal} />
                  </Modal>
                )}
                <li>
                  <button
                    type="button"
                    className={css.btnRegistration}
                    onClick={handleOpenRegistrationPopup}
                  >
                    Registration
                  </button>
                </li>
                {isOpenRegistrationPopup && (
                  <Modal onClose={closeModal} title="Registration">
                    <RegistrationPopup onClose={closeModal} />
                  </Modal>
                )}
              </div>
            </ul>
          </nav>
        </div>
        <div className={css.wrapTitles}>
          <h1 className={css.title}>Make Life Easier for the Family:</h1>
          <h2 className={css.subtitle}>
            Find Babysitters Online for All Occasions
          </h2>
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
    </section>
  );
};

export default Home;
