import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import Modal from "../Modal/Modal";
import LoginPopup from "../LoginPopup/LoginPopup";
import RegistrationPopup from "../RegistrationPopup/RegistrationPopup";

const Header = () => {
  const [isAuthorized] = useState(false);
  const [isOpenLoginPopup, setOpenLoginPopup] = useState(false);
  const [isOpenRegistrationPopup, setOpenRegistrationPopup] = useState(false);

  const handleOpenLoginPopup = () => {
    setOpenLoginPopup(true);
  };

  const handleOpenRegistrationPopup = () => {
    setOpenRegistrationPopup(true);
  };

  const closeModal = () => {
    setOpenLoginPopup(false);
    setOpenRegistrationPopup(false);
  };

  return (
    <div className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <NavLink to="/" className={css.logo}>
            Nanny.Services
          </NavLink>
          <div className={css.wraplist}>
            <ul className={css.list}>
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
              <li>
                <NavLink to="/favorites" className={css.link}>
                  Favorites
                </NavLink>
              </li>
            </ul>
            {isAuthorized ? (
              <ul className={css.wrapButtonsLogout}>
                <li>
                  <p>User</p>
                </li>
                <li>
                  <button type="button" className={css.btnLogout}>
                    Log out
                  </button>
                </li>
              </ul>
            ) : (
              <div className={css.wrapButtonsLogin}>
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
                  <Modal onClose={closeModal}>
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
                  <Modal onClose={closeModal}>
                    <RegistrationPopup onClose={closeModal} />
                  </Modal>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
