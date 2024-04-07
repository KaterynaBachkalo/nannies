import { FC, useState } from "react";
import Modal from "../Modal/Modal";
import { INanny } from "../../types";
import { ReactComponent as Iconmap } from "../../img/map.svg";
import { ReactComponent as Iconheart } from "../../img/heart.svg";
import { ReactComponent as Iconfillheart } from "../../img/fill_heart.svg";
import { ReactComponent as Iconstar } from "../../img/star.svg";

import css from "./NanniesCard.module.css";
import { useDispatch } from "react-redux";
import { addToFavorites, deleteFavorites } from "../../redux/nanniesSlice";
import { useSelector } from "react-redux";
import { selectFavoritesNannies } from "../../redux/selectors";
import AppointmentPopup from "../Popups/AppointmentPopup/AppointmentPopup";
import { selectUser } from "../../redux/authSlice";
import { toast } from "react-toastify";

interface IProp {
  nanny: INanny;
}

const NanniesCard: FC<IProp> = ({ nanny }) => {
  const {
    avatar_url,
    location,
    rating,
    price_per_hour,
    name,
    birthday,
    experience,
    kids_age,
    characters,
    education,
    about,
    reviews,
  } = nanny;

  const [isVisible, setVisible] = useState(false);
  const [isOpenPopUp, setOpenPopUp] = useState(false);

  const favorites = useSelector(selectFavoritesNannies);

  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const birthDay = new Date(birthday).getTime();
  const currentDate = new Date().getTime();
  const differenceMs = currentDate - birthDay;
  const age = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 365.25));

  const addToFavorite = () => {
    if (currentUser) {
      dispatch(addToFavorites(name));
    } else {
      toast.warning("This feature is only available to authorized users");
    }
  };

  const deleteFavorite = () => {
    if (currentUser) {
      dispatch(deleteFavorites(name));
    } else {
      toast.warning("This feature is only available to authorized users");
    }
  };

  const handleOpenPopUp = () => {
    setOpenPopUp(true);
  };

  const closeModal = () => {
    setOpenPopUp(false);
  };

  return (
    <div className={css.card}>
      <div className={css.avatarBorder}>
        <img src={avatar_url} alt="avatar" className={css.avatar} />
        <div className={css.onlineDot}></div>
      </div>
      <div>
        <div className={css.cardHeader}>
          <p className={css.position}>Nanny</p>
          <div className={css.mainCharacters}>
            <Iconmap className={css.icon} />
            <p>{location}</p>
            <span className={css.stroke}></span>
            <Iconstar className={css.icon} />
            <p>Rating: {rating}</p>
            <span className={css.stroke}></span>
            <p>
              Price / 1 hour:{" "}
              <span className={css.price}>{price_per_hour}$</span>
            </p>
            {!currentUser ? (
              <Iconheart onClick={addToFavorite} className={css.heart} />
            ) : !favorites.includes(name) ? (
              <Iconheart onClick={addToFavorite} className={css.heart} />
            ) : (
              <Iconfillheart onClick={deleteFavorite} className={css.heart} />
            )}
          </div>
        </div>
        <div>
          <p className={css.name}>{name}</p>
          <div className={css.nameKeys}>
            <p className={css.nameBackground}>
              Age: <span className={css.age}>{age}</span>
            </p>
            <p className={css.nameBackground}>
              Experience: <span className={css.value}>{experience}</span>
            </p>
            <p className={css.nameBackground}>
              Kids Age: <span className={css.value}>{kids_age}</span>
            </p>
            <p className={css.nameBackground}>
              Characters:{" "}
              <span className={css.value}>{characters.join(", ")}</span>
            </p>
            <p className={css.nameBackground}>
              Education: <span className={css.value}>{education}</span>
            </p>
            <p className={css.about}>{about}</p>
            {!isVisible && (
              <button
                onClick={() => setVisible(!isVisible)}
                className={css.buttonReadMore}
              >
                Read more
              </button>
            )}
          </div>

          {isVisible && (
            <>
              <ul className={css.reviewContent}>
                {reviews.map((rev) => (
                  <li className={css.reviewItem} key={rev.reviewer}>
                    <div className={css.reviews}>
                      <div className={css.noAvatar}>
                        <span className={css.letter}>
                          {rev.reviewer && rev.reviewer.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className={css.reviewer}>
                        <p>{rev.reviewer}</p>
                        <div className={css.rating}>
                          <Iconstar className={css.icon} />
                          <p>{rev.rating}</p>
                        </div>
                      </div>
                    </div>
                    <p className={css.comment}>{rev.comment}</p>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={css.btnMake}
                onClick={handleOpenPopUp}
              >
                Make an appointment
              </button>
              {isOpenPopUp && (
                <Modal
                  onClose={closeModal}
                  title="Make an appointment with a babysitter"
                >
                  <AppointmentPopup onClose={closeModal} nanny={nanny} />
                </Modal>
              )}

              <button
                onClick={() => setVisible(!isVisible)}
                className={css.buttonReadMore}
              >
                Read less
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NanniesCard;
