import React, { FC, useRef } from "react";
import css from "./LoginPopup.module.css";
import useCloseModals from "../../services/closeModals";
import FormLogin from "../FormLogin/FormLogin";

interface IProps {
  onClose: (value: boolean) => void;
}

const LoginPopup: FC<IProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useCloseModals(onClose, modalRef);

  return (
    <div>
      <div>
        <p className={css.subtitle}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
      </div>
      <FormLogin onClose={onClose} />
    </div>
  );
};

export default LoginPopup;
