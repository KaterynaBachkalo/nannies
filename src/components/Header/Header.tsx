import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./Header.module.css";
import Modal from "../Modal/Modal";
import LoginPopup from "../LoginPopup/LoginPopup";
import RegistrationPopup from "../RegistrationPopup/RegistrationPopup";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "../../redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { clearState } from "../../redux/nanniesSlice";
import { ReactComponent as IconAvatar } from "../../img/avatar.svg";

const Header = () => {
  const { currentUser } = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        dispatch(clearState());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          {!currentUser ? (
            <NavLink to="/" className={css.logo}>
              Nanny.Services
            </NavLink>
          ) : (
            <NavLink to="/nannies" className={css.logo}>
              Nanny.Services
            </NavLink>
          )}

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

              {currentUser && (
                <li>
                  <NavLink to="/favorites" className={css.link}>
                    Favorites
                  </NavLink>
                </li>
              )}
            </ul>
            {currentUser ? (
              <ul className={css.wrapButtonsLogout}>
                <li className={css.userWrap}>
                  <IconAvatar />
                  <p className={css.userName}>{currentUser.name}</p>
                </li>
                <li>
                  <button
                    type="button"
                    className={css.btnLogout}
                    onClick={handleLogOut}
                  >
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
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
